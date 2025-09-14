const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Placement Officer ID
  schoolCode: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);

