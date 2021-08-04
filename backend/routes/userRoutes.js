const express = require('express');
const getUsers = require('../controllers/userController.js');
const router = express.Router();

router.route('/').get(getUsers);

module.exports = router;
