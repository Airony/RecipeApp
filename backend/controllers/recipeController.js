const asyncHandler = require('express-async-handler')
const pool = require('../config/db.js');

//@desc    Fetch all recipes
//@route    GET /api/recipes
//access    public
const getRecipes = asyncHandler(async (req, res) => {
  try {
    const { rows, fields } = await pool.query(
      'SELECT * from "recipe";'
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {getRecipes}