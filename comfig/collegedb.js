const mongoose = require('mongoose');

const connectCollegeDB = () => {
  try {
    const conn = mongoose.createConnection(process.env.COLLEGE_DB_URI);
    console.log(`College Auth DB Connected: ${conn.name}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to College DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectCollegeDB();
