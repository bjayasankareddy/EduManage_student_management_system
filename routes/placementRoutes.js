const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, applyForJob, getJobApplicants } = require('../controllers/placementController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   POST /api/v1/placements/jobs
// @desc    Placement officer creates a new job posting
// @access  Private (Placement Officer)
router.post('/jobs', protect, authorize('placement_officer'), createJob);

// @route   GET /api/v1/placements/jobs
// @desc    Student or officer views all available jobs
// @access  Private (Student, Placement Officer)
router.get('/jobs', protect, authorize('student', 'placement_officer'), getAllJobs);

// @route   POST /api/v1/placements/jobs/:id/apply
// @desc    Student applies for a job
// @access  Private (Student)
router.post('/jobs/:id/apply', protect, authorize('student'), applyForJob);

// @route   GET /api/v1/placements/jobs/:id/applicants
// @desc    Placement officer views applicants for a job
// @access  Private (Placement Officer)
router.get('/jobs/:id/applicants', protect, authorize('placement_officer'), getJobApplicants);

module.exports = router;

