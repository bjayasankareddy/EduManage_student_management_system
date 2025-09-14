const User = require('../models/userModel');

// @desc    Search for a student by their unique ID
// @route   GET /api/v1/government/search?studentId=<ID>
// @access  Private (Government only)
exports.searchStudentById = async (req, res) => {
    try {
        const { studentId } = req.query;
        if (!studentId) {
            return res.status(400).json({ success: false, error: 'Please provide a student ID' });
        }
        const student = await User.findOne({ uniqueStudentId: studentId, role: 'student' }).select('-password');
        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

