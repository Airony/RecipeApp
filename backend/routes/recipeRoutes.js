const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
} = require("../controllers/recipeController");

router.route("/:id").get(getRecipeById);
router.route("/").get(getRecipes).post(createRecipe);

module.exports = router;