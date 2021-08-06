const asyncHandler = require('express-async-handler')
const pool = require('../config/db.js');

//@desc    Fetch all recipes
//@route    GET /api/recipes
//access    public
const getRecipes = asyncHandler(async (req, res) => {
    console.log(req.params)
  try {
    const { rows, fields } = await pool.query(
      'SELECT * from "recipe";'
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

//@desc    Fetch recipe by id
//@route    GET /api/recipes/:id
//access    public
const getRecipeById = asyncHandler(async (req, res) => {
    console.log('This')
  try {
    const { rows, fields } = await pool.query(
      'SELECT * from "recipe" WHERE recipeId = $1;',[req.params.id]
    );
    if(rows.length == 0){
        res.status(404).json({message: 'Recipe Not Found'})
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {getRecipes,getRecipeById}