import { body, validationResult, query } from "express-validator";
import { InvalidPropertyValueError } from "../utils/Error";

export const recipeValidationRules = () => {
  return [
    body("title", "You must specify a title.").exists(),
    body("description", "You must specify a description.").exists(),
    body("difficulty", "You must specify a difficulty.").exists(),
    body("category", "You must specify a category.").exists(),
    body("prepTime", "You must specify preptime in minutes.")
      .exists()
      .isNumeric(),
    body("cookTime", "You must specify cooktime in minutes.")
      .exists()
      .isNumeric(),
    body("ingredients", "You must include an array of ingredients.").isArray(),
    body("steps", "You must include an array of steps.").isArray(),
  ];
};

export const userIdValidationRules = () => {
  return [body("userId").isNumeric()];
};

export const commentValidationrules = () => {
  return [
    body("comment").exists().isLength({ max: 1000 }).bail(),
    body("recipeId").isNumeric().bail(),
  ];
};

export const commentUpdateValidationRules = () => {
  return [body("comment").exists().isLength({ max: 1000 })];
};

export const commentVoteValidationRules = () => {
  return [body("commentId").isNumeric(), body("dir").isIn([-1, 0, 1])];
};

export const getTopCommentsValidationRules = () => {
  return [query("recipeId").isNumeric(), query("commentCount").isNumeric()];
};

export const validate = (
  req: Express.Request,
  res: Express.Response,
  next: Function
) => {
  const validationObj = validationResult(req);
  if (!validationObj.isEmpty()) {
    const invalidParam = validationObj.array()[0].param;
    throw new InvalidPropertyValueError(invalidParam);
  }
  next();
};
