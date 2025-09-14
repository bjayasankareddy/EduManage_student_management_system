const User = require('../models/userModel');
const AcademicHistory = require('../models/academicHistoryModel');
const Notice = require('../models/noticeModel');
const Job = require('../models/jobModel');
const HostelComplaint = require('../models/hostelComplaintModel');

// @desc    Get all data for the student dashboard
// @route   GET /api/v1/students/dashboard
// @access  Private (Student only)
exports.getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    
    // Fetch all data in parallel for efficiency
    const [user, history, notices, jobs, complaints] = await Promise.all([
        User.findById(studentId).select('-password'),
        AcademicHistory.find({ studentId }).sort({ year: -1 }),
        Notice.find({ schoolCode: req.user.schoolCode }).sort({ createdAt: -1 }).limit(5),
        Job.find({ schoolCode: req.user.schoolCode, status: 'Open' }).sort({ createdAt: -1 }),
        HostelComplaint.find({ student: studentId }).sort({ createdAt: -1 })
    ]);

    // Calculate attendance percentage
    const totalClasses = user.attendance.length;
    const presentClasses = user.attendance.filter(att => att.status === 'Present').length;
    const attendancePercentage = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 100;

    const dashboardData = {
        user,
        attendancePercentage,
        academicHistory: history,
        notices,
        availableJobs: jobs,
        hostelComplaints: complaints
    };

    res.status(200).json({ success: true, data: dashboardData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

