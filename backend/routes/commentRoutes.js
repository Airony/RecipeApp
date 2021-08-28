const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  voteComment,
} = require("../controllers/commentController");
const { authOnly, softAdminCheck } = require("../middleware/authMiddleware");
const {
  commentValidationrules,
  validate,
  commentUpdateValidationRules,
  commentVoteValidationRules,
} = require("../middleware/validateMiddleware");

router
  .route("/")
  .post(authOnly, commentValidationrules(), validate, createComment);

router
  .route("/:id")
  .get(getCommentById)
  .delete(authOnly, softAdminCheck, deleteComment)
  .put(
    authOnly,
    softAdminCheck,
    commentUpdateValidationRules(),
    validate,
    updateComment
  );
router
  .route("/vote")
  .post(authOnly, commentVoteValidationRules(), validate, voteComment);

module.exports = router;
