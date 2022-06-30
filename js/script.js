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

const renderRequestFields = (renderFields) => (
  renderFields
    .map(({ name, type, required, values, placeholder, label }) => {
      const valuesArr = Object.keys(values);
      const fieldContainer = document.createElement('div');
      const fieldLabel = document.createElement('label');

      const select = document.createElement('select');
      select.name = name;
      select.id = name;

      renderSelectOptions(valuesArr, select);

      fieldLabel.innerText = name;
      fieldLabel.htmlFor = name;

      fieldContainer.appendChild(fieldLabel);
      fieldContainer.appendChild(select);

      form.appendChild(fieldContainer);
    })
)

const renderFields = async () => {
  const requestFields = await getRequestFields();
  renderRequestFields(requestFields);
}

window.onload = () => {
  renderFields();
};