const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { generateReport } = require('../controllers/billController');


router.post('/generateReport',auth.authenticateToken, generateReport)

module.exports = router