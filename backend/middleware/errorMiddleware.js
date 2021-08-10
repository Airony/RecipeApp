const {
  InvalidPropertyValueError,
  ObjectNotFoundError,
} = require("../utils/Error");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  if (err instanceof InvalidPropertyValueError) {
    statusCode = 400;
  } else if (err instanceof ObjectNotFoundError) {
    statusCode = 404;
  }
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "developement" ? err.stack : null,
  });
};

module.exports = { errorHandler };
