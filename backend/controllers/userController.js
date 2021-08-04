const asyncHandler = require('express-async-handler');
const pool = require('../config/db.js');

//@desc    Fetch all users
//@route    GET /api/users
//access    public
const getUsers = asyncHandler(async (req, res) => {
  try {
    const { rows, fields } = await pool.query('SELECT * from "user";');
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

module.exports = getUsers;
