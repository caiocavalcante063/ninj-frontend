const form = document.querySelector('form');

const getRequestFields = async () => {
  const requestFields = await fetch('http://localhost:3000/request-fields');
  const data = await requestFields.json();

  return data;
}

const renderSelectOptions = (valuesArr, select) => (
  valuesArr.map(value => {
    const option = document.createElement('option');
    option.value = value;
    option.id = value;
    option.innerText = value;

    select.appendChild(option);
  })
);

const renderFieldContainer = (label, name, childElement) => {
  const fieldContainer = document.createElement('div');
  const fieldLabel = document.createElement('label');

  fieldLabel.innerText = label;
  fieldLabel.htmlFor = name;

  fieldContainer.appendChild(fieldLabel);
  fieldContainer.appendChild(childElement);

  return fieldContainer;
}

const renderSelect = (name, required, values, label) => {
  const valuesArr = Object.keys(values);
  const select = document.createElement('select');

  select.name = name;
  select.id = name;
  required && select.setAttribute('required', 'required');

  renderSelectOptions(valuesArr, select);

  const fieldContainer = renderFieldContainer(label, name, select)

  form.appendChild(fieldContainer);
}

const renderText = (name, type, required, placeholder, label) => {
  const textInput = document.createElement('input');
  
  textInput.type = 'text';
  textInput.className = `text-${type}`;
  textInput.placeholder = placeholder;

  required && textInput.setAttribute('required', 'required');

  const fieldContainer = renderFieldContainer(label, name, textInput);

  form.appendChild(fieldContainer);
}

const renderRequestFields = (requestFields) => (
  requestFields
    .map(({ name, type, required, values, placeholder, label }) => {
      switch (type) {
        case 'enumerable':
          renderSelect(name, required, values, label);
          break;
        case 'big_text':
          renderText(name, type, required, placeholder, label);
          break;
        default:
          null
      }
    })
)

const renderFields = async () => {
  const requestFields = await getRequestFields();
  renderRequestFields(requestFields);
}

window.onload = () => {
  renderFields();
};