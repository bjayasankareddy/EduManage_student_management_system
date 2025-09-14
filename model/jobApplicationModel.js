const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected'],
    default: 'Applied'
  }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);

