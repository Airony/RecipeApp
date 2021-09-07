import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import pool from "../config/db";

export const authOnly = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(401);
    throw new Error("Session cookie missing.");
  }
  next();
};

export const authorOnly = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    try {
      const { rows } = await pool.query(
        `SELECT * FROM "author" WHERE user_id = $1;`,
        [userId]
      );

      if (rows.length == 0) {
        res.status(403);
        throw new Error("Only authors can post recipes");
      }
      next();
    } catch (error) {
      throw error;
    }
  }
);

export const hardAdminCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;

    if (!userId || (userId && !(await checkAdmin(userId)))) {
      res.status(403);
      throw new Error("Only admins can do that.");
    }

    next();
  }
);

export const softAdminCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;

    if (userId && (await checkAdmin(userId))) {
      req.isAdmin = true;
    }

    next();
  }
);

const checkAdmin = async (userId: string) => {
  if (!userId) return false;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM "admin" WHERE user_id = $1;`,
      [userId]
    );
    return rows.length > 0;
  } catch (error) {
    throw error;
  }
};
