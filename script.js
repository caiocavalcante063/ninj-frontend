const form = document.querySelector('form');

const getRequestFields = async () => {
  const requestFields = await fetch('http://localhost:3000/request-fields');
  const data = await requestFields.json();

  return data;
}

const renderFields = async () => {
  const fields = await getRequestFields();

  fields.map(({ name, type, required, values, placeholder, label }) => {
    const valuesArr = Object.keys(values);
    const fieldContainer = document.createElement('div');
    const fieldTitle = document.createElement('h2');

    fieldTitle.innerText = name;

    // valuesArr.map(item => {
    //   const radioInput = document.createElement
    // })

    fieldContainer.appendChild(fieldTitle);
    form.appendChild(fieldContainer);
  })
}

window.onload = () => {
  renderFields();
};