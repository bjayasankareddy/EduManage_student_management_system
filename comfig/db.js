const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Primary DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to Primary DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

    