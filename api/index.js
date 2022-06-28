const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();

app.use(bodyParser.json());

const PORT = '3000';
const FIELDS_JSON = '../fields.json';

app.get('/request-fields', async (_req, res) => {
  const fields = await fs.readFile(FIELDS_JSON, 'utf-8');
  const parsedFields = await JSON.parse(fields);
  const requestFields = parsedFields["_embedded"]["request_fields"]

  res.status(200).json(requestFields);
});

app.get('/user-fields', async (_req, res) => {
  const fields = await fs.readFile(FIELDS_JSON, 'utf-8');
  const parsedFields = await JSON.parse(fields);
  const userFields = parsedFields["_embedded"]["user_fields"]

  res.status(200).json(userFields);
});

app.listen(PORT, () => console.log(`ouvindo na porta ${3000}!`));