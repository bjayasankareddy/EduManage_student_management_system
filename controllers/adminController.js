const Application = require('../models/applicationModel');
const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, { resource_type: 'auto', folder: 'eduverse_admissions' })
        .then(result => {
            fs.unlinkSync(file.path);
            resolve(result);
        })
        .catch(error => {
            fs.unlinkSync(file.path);
            reject(error);
        });
    });
};

exports.submitApplication = async (req, res) => {
    try {
        const documentUrls = {};
        for (const key in req.files) {
            if (req.files[key] && req.files[key][0]) {
                const result = await uploadToCloudinary(req.files[key][0]);
                documentUrls[`${key}_url`] = result.secure_url;
            }
        }
        const applicationData = { ...req.body, documents: documentUrls };
        const application = await Application.create(applicationData);
        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ schoolCode: req.user.schoolCode, status: 'pending' });
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.approveApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, error: 'Application not found' });
        }
        // Create a new student user from the application
        const newStudent = await User.create({
            name: application.fullName,
            email: application.applicantEmail,
            password: 'DefaultPassword123!', // Admin should prompt user to change this
            role: 'student',
            schoolCode: application.schoolCode,
            department: application.departmentChoice,
            uniqueStudentId: `${application.schoolCode}-${Date.now()}`
        });
        application.status = 'approved';
        await application.save();
        res.status(200).json({ success: true, data: newStudent });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

