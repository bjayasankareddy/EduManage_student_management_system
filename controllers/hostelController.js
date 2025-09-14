const HostelComplaint = require('../models/hostelComplaintModel');

// @desc    Create a new hostel complaint
// @route   POST /api/v1/hostel/complaints
// @access  Private (Student only)
exports.createComplaint = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const complaint = await HostelComplaint.create({
            title,
            description,
            category,
            student: req.user.id,
            schoolCode: req.user.schoolCode,
        });
        res.status(201).json({ success: true, data: complaint });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all complaints for the logged-in student
// @route   GET /api/v1/hostel/complaints/my-complaints
// @access  Private (Student only)
exports.getMyComplaints = async (req, res) => {
    try {
        const complaints = await HostelComplaint.find({ student: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all complaints for a warden's school
// @route   GET /api/v1/hostel/complaints
// @access  Private (Hostel Warden only)
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await HostelComplaint.find({ schoolCode: req.user.schoolCode }).populate('student', 'name uniqueStudentId').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update a complaint's status
// @route   PUT /api/v1/hostel/complaints/:id
// @access  Private (Hostel Warden only)
exports.updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await HostelComplaint.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }
        res.status(200).json({ success: true, data: complaint });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

