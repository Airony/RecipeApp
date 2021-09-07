import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import pool from "../config/db";
import bcrypt from "bcrypt";
const { PostgresError } = require("pg-error-enum");
import { ObjectNotFoundError } from "../utils/Error";

//@desc    Fetch all users
//@route    GET /api/users
//@access    Public
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT user_id, full_name from "user";');
    res.status(200).json(rows);
  } catch (error) {
    throw error;
  }
});

//@desc    Add a new user
//@route    POST /api/users
//@access    Public
export const addUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password, profilePicture } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const { rows } = await pool.query(
      'INSERT INTO "user" (full_name, email, password, profile_picture) VALUES($1,$2,$3,$4);',
      [fullName, email, hashedPassword, profilePicture]
    );
    res.status(200).json(rows);
  } catch (error) {
    throw error;
  }
});

//@desc    Auth user and set session cookie
//@route    POST /api/users/login
//@access    Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query(
      'SELECT user_id,password FROM "user" WHERE email = $1',
      [email]
    );

    if (rows.length == 0) {
      res.status(404);
      throw new ObjectNotFoundError("User");
    }

    const userPassword = rows[0].password;
    const userId = rows[0]["user_id"];

    if (!(await bcrypt.compare(password, userPassword))) {
      res.status(401);
      throw new Error("Wrong password.");
    }

    req.session.userId = userId;
    res.status(200).end();
  } catch (error) {
    throw error;
  }
});

//@desc    Set user as an author
//@route    POST /api/users/setAuthor
//@access    Private/Admin
export const setAuthor = asyncHandler(async (req: Request, res: Response) => {
  const targetId = req.body.userId;
  try {
    await pool.query('INSERT INTO "author"(user_id) VALUES($1)', [targetId]);
  } catch (error: any) {
    switch (error.code) {
      case PostgresError.FOREIGN_KEY_VIOLATION:
        res.status(404);
        throw new ObjectNotFoundError("User");
      case PostgresError.UNIQUE_VIOLATION:
        break;
      default:
        throw error;
    }
  }
  res.status(204).end();
});

//@desc    Unset user as an author
//@route    POST /api/users/unsetAuthor
//@access    Private/Admin
export const unsetAuthor = asyncHandler(async (req: Request, res: Response) => {
  const targetId = req.body.userId;
  try {
    const { rows } = await pool.query(
      'DELETE FROM "author" WHERE user_id = $1 RETURNING user_id',
      [targetId]
    );
    if (rows.length == 0) {
      throw new ObjectNotFoundError("User");
    }
  } catch (error) {
    throw error;
  }
  res.status(204).end();
});
