const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
} = require("../controllers/recipeController");
const { authOnly, authorOnly } = require("../middleware/authMiddleware");
const { recipeValidator } = require("../middleware/validateMiddleware");

router.route("/:id").get(getRecipeById);
router
  .route("/")
  .get(getRecipes)
  .post(authOnly, authorOnly, recipeValidator, createRecipe);

module.exports = router;
