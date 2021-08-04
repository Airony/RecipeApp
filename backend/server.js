const express = require('express');
const dotenv = require('dotenv');
const { resolve } = require('path');
const pool = require('./config/db.js');

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
