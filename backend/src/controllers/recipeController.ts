import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import pool from "../config/db";
import { PostgresError } from "pg-error-enum";
import { InvalidPropertyValueError, ObjectNotFoundError } from "../utils/Error";

//@desc    Fetch all recipes
//@route    GET /api/recipes
//@access    Public
export const getRecipes = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * from "recipe";');
    res.status(200).json(rows);
  } catch (error) {
    throw error;
  }
});

//@desc    Fetch recipe by id
//@route    GET /api/recipes/:id
//@access    Public
export const getRecipeById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { rows: recipeRows } = await pool.query(
        'SELECT * from "recipe" WHERE recipe_id = $1;',
        [req.params["id"]]
      );

      if (recipeRows.length == 0) {
        throw new ObjectNotFoundError("Recipe");
      }

      const { rows: userRows } = await pool.query(
        'SELECT full_name from "user" WHERE user_id = $1;',
        [recipeRows[0]["user_id"]]
      );

      res
        .status(200)
        .json({ ...recipeRows[0], author_name: userRows[0]["full_name"] });
    } catch (error) {}
  }
);

//@desc    Create Recipe
//@route    POST /api/recipes/
//@access    Private/Author
export const createRecipe = asyncHandler(
  async (req: Request, res: Response) => {
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
      cookTime,
      prepTime,
      ingredients,
      steps,
      notes,
    } = req.body;
    try {
      const { rows } = await pool.query(
        `INSERT INTO "recipe"(user_id,title,description,recipe_difficulty,recipe_category,cook_time,prep_time,ingredients,steps,notes,image) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
        [
          userId,
          title,
          description,
          difficulty,
          category,
          cookTime,
          prepTime,
          ingredients,
          steps,
          notes,
          image.path,
        ]
      );
      res.status(200).json(rows[0]);
    } catch (error: any) {
      if (error.code == PostgresError.INVALID_TEXT_REPRESENTATION) {
        let invalidProperty = error.message.match(
          /(?<=\binvalid input value for enum\s)(\w+)/
        )[1];
        throw new InvalidPropertyValueError(invalidProperty);
      }
      throw error;
    }
  }
);
