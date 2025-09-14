const express = require('express');
const router = express.Router();
const { registerCollege, loginCollege } = require('../controllers/collegeAuthController');

// @route   POST /api/v1/college-auth/register
// @desc    Register a new college account
// @access  Public
router.post('/register', registerCollege);

// @route   POST /api/v1/college-auth/login
// @desc    Authenticate a college user
// @access  Public
router.post('/login', loginCollege);

module.exports = router;

