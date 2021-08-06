const express = require('express');
const dotenv = require('dotenv');
const { resolve } = require('path');
const userRoutes = require('./routes/userRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
dotenv.config({
  path: resolve(__dirname, '../.env'),
});

const app = express();

// app.use(cors);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
