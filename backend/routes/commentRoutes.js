const express = require("express");
const router = express.Router();
const { createComment } = require("../controllers/commentController");
const { authOnly } = require("../middleware/authMiddleware");
const {
  commentValidationrules,
  validate,
} = require("../middleware/validateMiddleware");

router
  .route("/")
  .post(authOnly, commentValidationrules(), validate, createComment);

module.exports = router;
