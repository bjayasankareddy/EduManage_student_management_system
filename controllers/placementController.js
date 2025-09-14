const Job = require('../models/jobModel');
const JobApplication = require('../models/jobApplicationModel');

// @desc    Create a new job posting
// @route   POST /api/v1/placements/jobs
// @access  Private (Placement Officer only)
exports.createJob = async (req, res) => {
    const { title, company, description, requirements } = req.body;
    try {
        const job = await Job.create({
            title, company, description, requirements,
            postedBy: req.user.id,
            schoolCode: req.user.schoolCode
        });
        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all open jobs for a school
// @route   GET /api/v1/placements/jobs
// @access  Private (Student, Placement Officer)
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ schoolCode: req.user.schoolCode, status: 'Open' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Student applies for a job
// @route   POST /api/v1/placements/jobs/:jobId/apply
// @access  Private (Student only)
exports.applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const studentId = req.user.id;
        
        const alreadyApplied = await JobApplication.findOne({ job: jobId, student: studentId });
        if (alreadyApplied) {
            return res.status(400).json({ success: false, error: 'You have already applied for this job' });
        }

        const application = await JobApplication.create({ job: jobId, student: studentId });
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all applicants for a specific job
// @route   GET /api/v1/placements/jobs/:jobId/applicants
// @access  Private (Placement Officer only)
exports.getJobApplicants = async (req, res) => {
    try {
        const applications = await JobApplication.find({ job: req.params.jobId }).populate('student', 'name email uniqueStudentId');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all applications for the logged-in student
// @route   GET /api/v1/placements/my-applications
// @access  Private (Student only)
exports.getStudentApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find({ student: req.user.id }).populate('job', 'title company status').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

