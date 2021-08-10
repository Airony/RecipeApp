const asyncHandler = require("express-async-handler");
const pool = require("../config/db.js");
const { INVALID_TEXT_REPRESENTATION } = require("pg-error-constants");
const {
  InvalidPropertyValueError,
  ObjectNotFoundError,
} = require("../utils/Error.js");

//@desc    Fetch all recipes
//@route    GET /api/recipes
//@access    Public
const getRecipes = asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * from "recipe";');
  res.status(200).json(rows);
});

//@desc    Fetch recipe by id
//@route    GET /api/recipes/:id
//@access    Public
const getRecipeById = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * from "recipe" WHERE recipeId = $1;',
    [req.params.id]
  );
  if (rows.length == 0) {
    throw new ObjectNotFoundError("Recipe");
  }
  res.status(200).json(rows[0]);
});

//@desc    Create Recipe
//@route    POST /api/recipes/
//@access    Private/Author
const createRecipe = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const image = req.file;
  if (!image) {
    res.status(400);
    throw new Error("Missing image.");
  }
  const {
    title,
    description,
    difficulty,
    category,
    ingredients,
    steps,
    notes,
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
        image.path,
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
    throw error;
  }
});

module.exports = { getRecipes, getRecipeById, createRecipe };
