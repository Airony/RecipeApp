const asyncHandler = require('express-async-handler')
const pool = require('../config/db.js');

//@desc    Fetch all recipes
//@route    GET /api/recipes
//access    public
const getRecipes = asyncHandler(async (req, res) => {
    console.log(req.params)
    const { rows, fields } = await pool.query(
      'SELECT * from "recipe";'
    );
    res.status(200).json(rows);
  }
);

//@desc    Fetch recipe by id
//@route    GET /api/recipes/:id
//access    public
const getRecipeById = asyncHandler(async (req, res) => {
    const { rows, fields } = await pool.query(
      'SELECT * from "recipe" WHERE recipeId = $1;',[req.params.id]
    );
    if(rows.length == 0){
        res.status(404)
        throw new Error ("Recipe not found")
    }
    res.status(200).json(rows[0]);
});



module.exports = {getRecipes,getRecipeById}