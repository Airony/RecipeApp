const {
  InvalidPropertyValueError,
  ObjectNotFoundError,
  ForeignKeyError,
} = require("../utils/Error");
const fs = require("fs");

const errorHandler = (err, req, res, next) => {
  // Remove file incase of error
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  message = err.message;
  let statusCode = 500;
  if (err instanceof InvalidPropertyValueError) {
    statusCode = 400;
  } else if (err instanceof ObjectNotFoundError) {
    statusCode = 404;
  } else if (err instanceof ForeignKeyError) {
    statusCode = 400;
    switch (err.constraint) {
      case "comment_recipe_id_fkey":
        message = "Invalid recipe id.";
        break;
      default:
        break;
    }
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "developement" ? err.stack : null,
  });
};

module.exports = { errorHandler };
