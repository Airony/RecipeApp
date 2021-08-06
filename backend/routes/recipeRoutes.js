const express = require('express');
const router = express.Router();
const {getRecipes} = require('../controllers/recipeController')


router.route('/').get(getRecipes);

module.exports = router