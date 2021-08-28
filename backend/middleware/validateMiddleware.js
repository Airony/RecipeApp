const {
  body,
  validationResult,
  ValidationChain,
} = require("express-validator");
const { InvalidPropertyValueError } = require("../utils/Error");

recipeValidationRules = () => {
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

const userIdValidationRules = () => {
  return [body("userId").isNumeric()];
};

commentValidationrules = () => {
  return [
    body("comment").exists().isLength({ max: 1000 }).bail(),
    body("recipeId").isNumeric().bail(),
  ];
};

commentUpdateValidationRules = () => {
  return [body("comment").exists().isLength({ max: 1000 })];
};

commentVoteValidationRules = () => {
  return [body("commentId").isNumeric(), body("dir").isIn([-1, 0, 1])];
};

getTopCommentsValidationRules = () => {
  return [body("recipeId").isNumeric(), body("commentCount").isNumeric()];
};

const validate = (req, res, next) => {
  const validationObj = validationResult(req);
  if (!validationObj.isEmpty()) {
    const invalidParam = validationObj.errors[0].param;
    throw new InvalidPropertyValueError(invalidParam);
  }
  next();
};

module.exports = {
  recipeValidationRules,
  userIdValidationRules,
  validate,
  commentValidationrules,
  commentUpdateValidationRules,
  commentVoteValidationRules,
  getTopCommentsValidationRules,
};
