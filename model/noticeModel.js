const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  department: {
    type: String,
    default: 'All' // Can be 'All' or a specific department name
  },
  schoolCode: {
    type: String,
    required: true
  },
  postedBy: {
    type: String // Name of the staff member
  }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);

