import express from "express";
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
} = require("../controllers/recipeController");
import { authOnly, authorOnly } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";
const {
  recipeValidationRules,
  validate,
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

export default router;
