const asyncHandler = require("express-async-handler");
const pool = require("../config/db");

const authOnly = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401);
    throw new Error("Session cookie missing.");
  }
  next();
};

const authorOnly = asyncHandler(async (req, res, next) => {
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
});

const hardAdminCheck = asyncHandler(async (req, res, next) => {
  const userId = req.session.userId;
  const isAdmin = await checkAdmin(userId);
  if (!isAdmin) {
    res.status(403);
    throw new Error("Only admins can do that.");
  }
  next();
});

const softAdminCheck = asyncHandler(async (req, res, next) => {
  const userId = req.session.userId;
  const isAdmin = await checkAdmin(userId);
  if (isAdmin) {
    req.isAdmin = true;
  }
  next();
});

const checkAdmin = async (userId) => {
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

module.exports = { authOnly, authorOnly, softAdminCheck, hardAdminCheck };
