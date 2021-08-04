const express = require('express');
const dotenv = require('dotenv');
const { resolve } = require('path');

const app = express();

dotenv.config({
  path: resolve(__dirname, '../.env'),
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
