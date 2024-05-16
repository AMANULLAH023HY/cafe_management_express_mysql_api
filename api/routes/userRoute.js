const express = require('express');
const { signupController, loginController, forgotPasswordController } = require('../controllers/userController');

const router = express.Router();

// New user create route
router.post('/signup',signupController);

// user login route
router.post('/login',loginController);

// forgot password route
router.post('/forgotPassword',forgotPasswordController);

module.exports = router;