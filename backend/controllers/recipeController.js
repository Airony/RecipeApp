const asyncHandler = require("express-async-handler");
const pool = require("../config/db.js");
const { INVALID_TEXT_REPRESENTATION } = require("pg-error-constants");
const { InvalidPropertyValueError } = require("../utils/Error.js");

const DatabaseError = new Error();

//@desc    Fetch all recipes
//@route    GET /api/recipes
//access    public
const getRecipes = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { rows, fields } = await pool.query('SELECT * from "recipe";');
  res.status(200).json(rows);
});

//@desc    Fetch recipe by id
//@route    GET /api/recipes/:id
//access    public
const getRecipeById = asyncHandler(async (req, res) => {
  const { rows, fields } = await pool.query(
    'SELECT * from "recipe" WHERE recipeId = $1;',
    [req.params.id]
  );
  if (rows.length == 0) {
    res.status(404);
    throw new Error("Recipe not found");
  }
  res.status(200).json(rows[0]);
});

//@desc    Create Recipe
//@route    POST /api/recipes/
//access    Private/Author
const createRecipe = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const {
    title,
    description,
    difficulty,
    category,
    ingredients,
    steps,
    notes,
    image,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO "recipe"(userId,title,description,recipe_difficulty,recipe_category,ingredients,steps,notes,image) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        userId,
        title,
        description,
        difficulty,
        category,
        ingredients,
        steps,
        notes,
        image,
      ]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    if (error.code == INVALID_TEXT_REPRESENTATION) {
      let invalidProperty = error.message.match(
        /(?<=\binvalid input value for enum\s)(\w+)/
      )[1];
      throw new InvalidPropertyValueError(invalidProperty);
    }
  }
});

module.exports = { getRecipes, getRecipeById, createRecipe };
