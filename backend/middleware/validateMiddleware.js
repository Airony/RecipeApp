const {
  body,
  validationResult,
  ValidationChain,
} = require("express-validator");

recipeValidationRules = () => {
  return [
    body("title", "You must specify a title.").exists(),
    body("description", "You must specify a description.").exists(),
    body("difficulty", "You must specify a difficulty.").exists(),
    body("category", "You must specify a category.").exists(),
    body("image", "You must add an image url.").exists(),
    body("ingredients", "You must include an array of ingredients.").isArray(),
    body("steps", "You must include an array of steps.").isArray(),
  ];
};

const userIdValidationRules = () => {
  return [body("userId").isNumeric()];
};

const validate = (req, res, next) => {
  console.log(req["express-validator#contexts"]);
  console.log("validate");
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { recipeValidationRules, userIdValidationRules, validate };
