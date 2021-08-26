const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");
const { authOnly, softAdminCheck } = require("../middleware/authMiddleware");
const {
  commentValidationrules,
  validate,
} = require("../middleware/validateMiddleware");

router
  .route("/")
  .post(authOnly, commentValidationrules(), validate, createComment);

router.route("/:id").delete(authOnly, softAdminCheck, deleteComment);

module.exports = router;
