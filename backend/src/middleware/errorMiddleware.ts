import { NODE_ENV } from "./../config/server.config";
import { Request, Response, NextFunction } from "express";
import {
  InvalidPropertyValueError,
  ObjectNotFoundError,
  ForeignKeyError,
} from "../utils/Error";
import fs from "fs";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Remove file incase of error
  if (req.file) {
    fs.unlink(req.file.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  let message = err.message;
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
      case "comment_vote_comment_id_fkey":
        message = "Invalid comment id.";
        break;
      default:
        break;
    }
  }

  res.status(statusCode).json({
    message: message,
    stack: NODE_ENV ? err.stack : null,
  });
};
