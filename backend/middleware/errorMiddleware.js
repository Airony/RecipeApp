const {
  InvalidPropertyValueError,
  ObjectNotFoundError,
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
