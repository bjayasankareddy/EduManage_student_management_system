const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    guardianName: { type: String },
    applicantEmail: { type: String, required: true },
    schoolCode: { type: String, required: true },
    departmentChoice: { type: String },
    studentMobile: { countryCode: String, number: String },
    guardianMobile: { countryCode: String, number: String },
    address: {
        street: String,
        city: String,
        district: String,
        state: String,
        zipcode: String,
        country: String
    },
    // Document URLs from Cloudinary
    documents: {
        marksheet10th_url: { type: String },
        marksheet12th_url: { type: String },
        marksheetJee_url: { type: String },
        passportPhoto_url: { type: String }
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);

