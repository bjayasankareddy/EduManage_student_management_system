const express = require('express');
const router = express.Router();
const { submitApplication, getApplications, approveApplication } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   POST /api/v1/admissions/apply
// @desc    Submit a new student application
// @access  Public
router.post('/admissions/apply', upload, submitApplication);

// @route   GET /api/v1/admin/applications
// @desc    Get all pending applications
// @access  Private (Admin)
router.get('/admin/applications', protect, authorize('admin'), getApplications);

// @route   POST /api/v1/admin/applications/:id/approve
// @desc    Approve an application
// @access  Private (Admin)
router.post('/admin/applications/:id/approve', protect, authorize('admin'), approveApplication);


module.exports = router;

