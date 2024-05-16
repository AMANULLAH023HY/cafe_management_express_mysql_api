const express = require('express');
const { signupController, loginController } = require('../controllers/userController');

const router = express.Router();

// New user create route
router.post('/signup',signupController);

// user login route
router.post('/login',loginController);

module.exports = router;