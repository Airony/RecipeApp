const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  createComment,
} = require("../controllers/recipeController");
const { authOnly, authorOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  recipeValidationRules,
  validate,
  commentValidationrules,
} = require("../middleware/validateMiddleware");

router.route("/:id").get(getRecipeById);
router
  .route("/")
  .get(getRecipes)
  .post(
    authOnly,
    authorOnly,
    upload.single("image"),
    recipeValidationRules(),
    validate,
    createRecipe
  );

router
  .route("/comments")
  .post(authOnly, commentValidationrules(), validate, createComment);

module.exports = router;
