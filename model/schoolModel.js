const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  schoolName: {
    type: String,
    required: true
  },
  city: {
    type: String
  }
});

module.exports = mongoose.model('School', schoolSchema);

