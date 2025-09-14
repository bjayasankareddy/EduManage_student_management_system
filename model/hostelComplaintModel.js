const mongoose = require('mongoose');

const hostelComplaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String }, // e.g., 'Electrical', 'Plumbing', 'Wi-Fi'
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schoolCode: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('HostelComplaint', hostelComplaintSchema);

