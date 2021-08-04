const express = require('express');
const { getUsers, addUser } = require('../controllers/userController.js');
const router = express.Router();

router.route('/').get(getUsers);
router.route('/').post(addUser);

module.exports = router;
