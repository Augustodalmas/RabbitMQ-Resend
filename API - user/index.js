// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./src/routes/routes');

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/v1', route)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
