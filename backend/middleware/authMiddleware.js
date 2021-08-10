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

  const { rows } = await pool.query(
    `SELECT * FROM "author" WHERE userId = $1;`,
    [userId]
  );

  if (rows.length == 0) {
    res.status(403);
    throw new Error("Only authors can post recipes");
  }

  next();
});

const adminOnly = asyncHandler(async (req, res, next) => {
  const userId = req.session.userId;

  const { rows } = await pool.query(
    `SELECT * FROM "admin" WHERE userId = $1;`,
    [userId]
  );

  if (rows.length == 0) {
    res.status(403);
    throw new Error("Only admins can do that.");
  }

  next();
});

module.exports = { authOnly, authorOnly, adminOnly };
