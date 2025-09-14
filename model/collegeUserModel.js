const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const collegeDB = require('../config/collegedb'); // Uses the secondary DB connection

const collegeUserSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: String }
}, { timestamps: true });

// Hash password before saving
collegeUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
collegeUserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Use the dedicated collegeDB connection to create this model
module.exports = collegeDB.model('CollegeUser', collegeUserSchema);

