const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
} = require("../controllers/recipeController");
const { authOnly, authorOnly } = require("../middleware/authMiddleware");
const {
  recipeValidationRules,
  validate,
} = require("../middleware/validateMiddleware");

router.route("/:id").get(getRecipeById);
router
  .route("/")
  .get(getRecipes)
  .post(authOnly, authorOnly, recipeValidationRules(), validate, createRecipe);

module.exports = router;
