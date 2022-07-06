const form = document.querySelector('form');

const getRequestFields = async () => {
  const requestFields = await fetch('http://localhost:3000/request-fields');
  const data = await requestFields.json();

  return data;
}

const getUserFields = async () => {
  const userFields = await fetch('http://localhost:3000/user-fields');
  const data = await userFields.json();

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

const checkAssignableInputType = (type) => {
  switch (type) {
    case 'small_text':
    case 'big_text':
      return 'text';
    case 'cep':
      return 'number';
    case 'phone':
      return 'tel';
    default:
      return type
  }
}

const renderInput = (name, type, assignableInputType, required, placeholder, label) => {
  const input = document.createElement('input');

  input.type =  assignableInputType;

  input.className = `text-${type}`;
  input.placeholder = placeholder;

  required && input.setAttribute('required', 'required');

  const fieldContainer = renderFieldContainer(label, name, input);

  form.appendChild(fieldContainer);
}

const renderFields = (requestFields) => (
  requestFields
    .map(({ name, type, required, values, placeholder, label }) => {
      switch (type) {
        case 'enumerable':
          renderSelect(name, required, values, label);
          break;
        case 'small_text':
        case 'big_text':
        case 'cep':
        case 'email':
        case 'phone':
          const assignableInputType = checkAssignableInputType(type)
          renderInput(name, type, assignableInputType, required, placeholder, label);
          break;
        default:
          null
      }
    })
)

const renderForm = async () => {
  const fields = await Promise.all([getRequestFields(), getUserFields()])

  const mergedFields = [].concat.apply([], fields)

  renderFields(mergedFields);
}

window.onload = () => {
  renderForm();
};