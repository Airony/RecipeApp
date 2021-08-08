const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
} = require("../controllers/recipeController");
const { recipeValidator } = require("../middleware/validatorMiddleware");

router.route("/:id").get(getRecipeById);
router.route("/").get(getRecipes).post(recipeValidator, createRecipe);

module.exports = router;
