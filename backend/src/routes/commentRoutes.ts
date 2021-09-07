import express from "express";
const router = express.Router();
import {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  voteComment,
  getTopComments,
} from "../controllers/commentController";
import { authOnly, softAdminCheck } from "../middleware/authMiddleware";
import {
  commentValidationrules,
  validate,
  commentUpdateValidationRules,
  commentVoteValidationRules,
  getTopCommentsValidationRules,
} from "../middleware/validateMiddleware";

router
  .route("/getTop")
  .get(getTopCommentsValidationRules(), validate, getTopComments);

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

export default router;
