const express = require('express');
const dotenv = require('dotenv');
const { resolve } = require('path');
const {errorHandler} = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes.js');
const recipeRoutes = require('./routes/recipeRoutes.js');
dotenv.config({
  path: resolve(__dirname, '../.env'),
});

const app = express();

// Middleware

app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Error Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
