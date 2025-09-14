const CollegeUser = require('../models/collegeUserModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// @desc    Register a new college
// @route   POST /api/v1/college-auth/register
// @access  Public
exports.registerCollege = async (req, res) => {
    const { collegeName, registrationNumber, email, password, address, contact } = req.body;
    try {
        const collegeExists = await CollegeUser.findOne({ email });
        if (collegeExists) {
            return res.status(400).json({ success: false, error: 'College already exists' });
        }
        const college = await CollegeUser.create({
            collegeName, registrationNumber, email, password, address, contact
        });
        res.status(201).json({ success: true, token: generateToken(college._id) });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Login for college user
// @route   POST /api/v1/college-auth/login
// @access  Public
exports.loginCollege = async (req, res) => {
    const { email, password } = req.body;
    try {
        const college = await CollegeUser.findOne({ email });
        if (college && (await college.matchPassword(password))) {
            res.json({ success: true, token: generateToken(college._id) });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

