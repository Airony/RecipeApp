const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
} = require("../controllers/commentController");
const { authOnly, softAdminCheck } = require("../middleware/authMiddleware");
const {
  commentValidationrules,
  validate,
  commentUpdateValidationRules,
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

module.exports = router;
