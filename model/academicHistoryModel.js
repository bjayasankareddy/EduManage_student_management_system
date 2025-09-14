const mongoose = require('mongoose');

const academicHistorySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  semester: {
    type: Number
  },
  subjects: [{
    subjectName: String,
    grade: String,
    score: Number
  }],
  overallPercentage: Number
});

module.exports = mongoose.model('AcademicHistory', academicHistorySchema);

