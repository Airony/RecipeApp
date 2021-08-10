const express = require("express");
const {
  getUsers,
  addUser,
  authUser,
  setAuthor,
  unsetAuthor,
} = require("../controllers/userController.js");
const { authOnly, adminOnly } = require("../middleware/authMiddleware.js");
const { setAuthorValidator } = require("../middleware/validateMiddleware.js");
const router = express.Router();

router.route("/").get(getUsers);
router.route("/login").post(authUser);
router.route("/").post(addUser);
router
  .route("/setAuthor")
  .post(authOnly, adminOnly, setAuthorValidator, setAuthor);
router
  .route("/unsetAuthor")
  .post(authOnly, adminOnly, setAuthorValidator, unsetAuthor);

module.exports = router;
