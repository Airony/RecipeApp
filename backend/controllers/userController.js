const asyncHandler = require('express-async-handler');
const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

//@desc    Fetch all users
//@route    GET /api/users
//access    public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const { rows, fields } = await pool.query(
      'SELECT id, full_name from "user";'
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

//@desc    Add a new user
//@route    POST /api/users
//access    public
const addUser = asyncHandler(async (req, res) => {
  try {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;
    let profilePicture = req.body.profilePicture;
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const { rows, fields } = await pool.query(
      'INSERT INTO "user" (full_name, email, password, profile_picture) VALUES($1,$2,$3,$4);',
      [fullName, email, hashedPassword, profilePicture]
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { getUsers, addUser };
