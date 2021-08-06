const asyncHandler = require('express-async-handler');
const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

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
  }
);

module.exports = { getUsers, addUser };
