const asyncHandler = require("express-async-handler");
const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const {
  UNIQUE_VIOLATION,
  FOREIGN_KEY_VIOLATION,
} = require("pg-error-constants");
const { ObjectNotFoundError } = require("../utils/Error.js");

//@desc    Fetch all users
//@route    GET /api/users
//access    public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const { rows, fields } = await pool.query(
      'SELECT userId, full_name from "user";'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

//@desc    Add a new user
//@route    POST /api/users
//access    public
const addUser = asyncHandler(async (req, res) => {
  let fullName = req.body.fullName;
  let email = req.body.email;
  let password = req.body.password;
  let profilePicture = req.body.profilePicture;

  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  const { rows, fields } = await pool.query(
    'INSERT INTO "user" (full_name, email, password, profile_picture) VALUES($1,$2,$3,$4);',
    [fullName, email, hashedPassword, profilePicture]
  );
  res.status(200).json(rows);
});

//@desc    Auth user and set session cookie
//@route    POST /api/users/login
//access    public
const authUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!(email && password)) {
    res.status(400);
    throw new Error("Missing credentials.");
  }
  console.log("wtf");
  const { rows, fields } = await pool.query(
    'SELECT userId,password FROM "user" WHERE email = $1',
    [email]
  );

  if (rows.length == 0) {
    res.status(404);
    throw new Error("Wrong email.");
  }
  console.log(rows[0]);
  const userPassword = rows[0].password;
  const userId = rows[0].userid;

  console.log(password, userPassword);
  if (!(await bcrypt.compare(password, userPassword))) {
    res.status(401);
    throw new Error("Wrong password.");
  }
  req.session.userId = userId;
  console.log(req.session);
  res.status(200).end();
});

//@desc    Set user as an author
//@route    POST /api/users/setAuthor
//@access    Private/Admin
const setAuthor = asyncHandler(async (req, res) => {
  const targetId = req.body.userId;
  try {
    await pool.query('INSERT INTO "author"(userId) VALUES($1)', [targetId]);
  } catch (error) {
    switch (error.code) {
      case FOREIGN_KEY_VIOLATION:
        res.status(404);
        throw new ObjectNotFoundError("User");
      case UNIQUE_VIOLATION:
        break;
      default:
        throw error;
    }
  }
  res.status(204).end();
});

//@desc    Unset user as an author
//@route    POST /api/users/unsetAuthor
//@access    Private/Admin
const unsetAuthor = asyncHandler(async (req, res) => {
  const targetId = req.body.userId;
  try {
    const { rows } = await pool.query(
      'DELETE FROM "author" WHERE userId = $1 RETURNING userId',
      [targetId]
    );
    if (rows.length == 0) {
      throw new ObjectNotFoundError("User");
    }
  } catch (error) {
    throw error;
  }
  res.status(204).end();
});

module.exports = { getUsers, addUser, authUser, setAuthor, unsetAuthor };
