const asyncHandler = require("express-async-handler");
const pool = require("../config/db.js");
const { ForeignKeyError, ObjectNotFoundError } = require("../utils/Error.js");

//@desc    Post comment
//@route    POST /api/comments/
//@access    Private/Auth
const createComment = asyncHandler(async (req, res) => {
  const { comment, recipeId } = req.body;
  const userId = req.session.userId;
  try {
    const { rows } = await pool.query(
      'INSERT INTO "comment"(user_id,recipe_id,content) VALUES($1,$2,$3) RETURNING comment_id,content',
      [userId, recipeId, comment]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    switch (error.code) {
      case "23503":
        throw new ForeignKeyError(error);
      default:
        throw error;
    }
  }
});

//@desc    Delete comment
//@route    DELETE /api/comments/
//@access    Private/Admin/Comment poster
const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  try {
    if (!req.isAdmin) {
      const userId = req.session.userId;
      const { rows: userIdRows } = await pool.query(
        `SELECT user_id FROM "comment" WHERE comment_id = $1`,
        [commentId]
      );
      if (userIdRows.length == 0) {
        throw new ObjectNotFoundError("comment");
      }
      if (userIdRows[0]["user_id"] != userId) {
        res.status(403).end();
      }
    }

    const { rows: commentRows } = await pool.query(
      'DELETE FROM "comment" WHERE comment_id = $1 RETURNING comment_id,content',
      [commentId]
    );
    if (commentRows.length == 0) {
      throw new ObjectNotFoundError("comment");
    }
    res.status(200).json(commentRows[0]);
  } catch (error) {
    throw error;
  }
});

//@desc    Edit comment
//@route    PUT /api/comments/
//@access    Private/Admin/Comment poster
const updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const comment = req.body.comment;
  try {
    if (!req.isAdmin) {
      const userId = req.session.userId;
      const { rows: userIdRows } = await pool.query(
        `SELECT user_id FROM "comment" WHERE comment_id = $1`,
        [commentId]
      );
      if (userIdRows.length == 0) {
        throw new ObjectNotFoundError("comment");
      }
      if (userIdRows[0]["user_id"] != userId) {
        res.status(403).end();
        return;
      }
    }

    const { rows: commentRows } = await pool.query(
      'UPDATE "comment" SET content = $1 WHERE comment_id = $2 RETURNING comment_id,content',
      [comment, commentId]
    );
    if (commentRows.length == 0) {
      throw new ObjectNotFoundError("comment");
    }
    res.status(200).json(commentRows[0]);
  } catch (error) {
    throw error;
  }
});

//@desc    Get comment by id
//@route    PUT /api/comments/:id
//@access    Public
const getCommentById = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  try {
    const { rows: commentRows } = await pool.query(
      `SELECT comment_id, content FROM "comment" WHERE comment_id = $1`,
      [commentId]
    );
    if (commentRows.length == 0) {
      throw new ObjectNotFoundError("Comment");
    }
    res.status(200).json(commentRows[0]);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
};
