const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();

// register user
router.post('/create', userController.registerUser);

module.exports = router;
