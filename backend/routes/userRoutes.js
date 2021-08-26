const express = require("express");
const {
  getUsers,
  addUser,
  authUser,
  setAuthor,
  unsetAuthor,
} = require("../controllers/userController.js");
const { authOnly, hardAdminCheck } = require("../middleware/authMiddleware.js");
const {
  userIdValidationRules,
  validate,
} = require("../middleware/validateMiddleware.js");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/login").post(authUser);
router.route("/").post(addUser);
router
  .route("/setAuthor")
  .post(authOnly, hardAdminCheck, userIdValidationRules(), validate, setAuthor);
router
  .route("/unsetAuthor")
  .post(
    authOnly,
    hardAdminCheck,
    userIdValidationRules(),
    validate,
    unsetAuthor
  );

module.exports = router;
