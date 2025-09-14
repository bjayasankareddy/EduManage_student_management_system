const express = require('express');
const router = express.Router();
const { createComplaint, getStudentComplaints, getAllComplaints, updateComplaintStatus } = require('../controllers/hostelController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   POST /api/v1/hostel/complaints
// @desc    Student creates a new complaint
// @access  Private (Student)
router.post('/complaints', protect, authorize('student'), createComplaint);

// @route   GET /api/v1/hostel/complaints/my-complaints
// @desc    Student views their own complaints
// @access  Private (Student)
router.get('/complaints/my-complaints', protect, authorize('student'), getStudentComplaints);

// @route   GET /api/v1/hostel/complaints
// @desc    Warden views all complaints
// @access  Private (Hostel Warden)
router.get('/complaints', protect, authorize('hostel_warden'), getAllComplaints);

// @route   PUT /api/v1/hostel/complaints/:id
// @desc    Warden updates a complaint's status
// @access  Private (Hostel Warden)
router.put('/complaints/:id', protect, authorize('hostel_warden'), updateComplaintStatus);

module.exports = router;

