const express = require('express');
const { getUsers, addUser,authUser } = require('../controllers/userController.js');
const router = express.Router();

router.route('/').get(getUsers);
router.route('/login').post(authUser);
router.route('/').post(addUser);

module.exports = router;
