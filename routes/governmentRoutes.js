const express = require('express');
const router = express.Router();
const { searchStudentById } = require('../controllers/governmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/v1/government/search
// @desc    Search for a student by their unique ID
// @access  Private (Government)
router.get('/search', protect, authorize('government'), searchStudentById);

module.exports = router;

