const express = require('express');
const { signupController } = require('../controllers/userController');

const router = express.Router();

// New user create route
router.post('/signup',signupController);

module.exports = router;