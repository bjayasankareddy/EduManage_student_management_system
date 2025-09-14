const express = require('express');
const router = express.Router();
const { getStudentDashboard } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/v1/students/dashboard
// @desc    Get all data for the student dashboard
// @access  Private (Student)
router.get('/dashboard', protect, authorize('student'), getStudentDashboard);

module.exports = router;

