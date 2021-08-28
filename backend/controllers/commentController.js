const asyncHandler = require("express-async-handler");
const { FOREIGN_KEY_VIOLATION } = require("pg-error-constants");
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
    const { rows: voteRows } = await pool.query(
      `SELECT sum(CASE WHEN vote = true THEN 1 WHEN vote = false THEN -1 ELSE 0 end)::INT AS points FROM "comment_vote" WHERE comment_id = $1`,
      [commentId]
    );

    res.status(200).json({ ...commentRows[0], ...voteRows[0] });
  } catch (error) {
    throw error;
  }
});

const voteComment = asyncHandler(async (req, res) => {
  const userId = req.session.userId;
  const { commentId, dir } = req.body;
  try {
    if (dir == 0) {
      console.log("Deleting");
      const { rows } = await pool.query(
        `DELETE FROM "comment_vote" WHERE (comment_id = $1 AND user_id = $2) RETURNING *`,
        [commentId, userId]
      );
      res.status(202).end();
      return;
    }
    const insertValue = dir == 1 ? 1 : 0;

    const { rows } = await pool.query(
      `INSERT INTO "comment_vote"(comment_id,user_id,vote) VALUES($1,$2,$3) 
                                ON CONFLICT (comment_id,user_id)
                                DO UPDATE SET vote = $3 WHERE (comment_vote.comment_id = $1 AND  comment_vote.user_id = $2);`,
      [commentId, userId, insertValue]
    );
    res.status(202).end();
  } catch (error) {
    switch (error.code) {
      case FOREIGN_KEY_VIOLATION:
        throw new ForeignKeyError(error);
      default:
        throw error;
    }
  }
});

//@desc    Fetch top n comments by votes
//@route    GET /api/comments/getTop
//@access    Public
const getTopComments = asyncHandler(async (req, res) => {
  const { recipeId, commentCount } = req.body;
  try {
    const { rows: commentRows } = await pool.query(
      `
      SELECT c.comment_id, c.content, sum(CASE WHEN v.vote = true THEN 1 WHEN v.vote = false THEN -1 ELSE 0 end)::INT AS points 
      FROM comment c LEFT JOIN comment_vote v ON(c.comment_id = v.comment_id) 
      WHERE c.recipe_id = $1 GROUP BY c.comment_id ORDER BY points DESC LIMIT $2;
      `,
      [recipeId, commentCount]
    );
  } catch (error) {
    throw error;
  }
  const { rows: commentRows } = await pool.query(
    `
  SELECT c.comment_id, c.content, sum(CASE WHEN v.vote = true THEN 1 WHEN v.vote = false THEN -1 ELSE 0 end)::INT AS points 
  FROM comment c LEFT JOIN comment_vote v ON(c.comment_id = v.comment_id) 
  WHERE c.recipe_id = $1 GROUP BY c.comment_id ORDER BY points DESC LIMIT $2;
  `,
    [recipeId, commentCount]
  );
  res.status(200).json(commentRows);
});

module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  voteComment,
  getTopComments,
};
