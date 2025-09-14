const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Primary DB
require('./config/collegedb'); // Initializes the secondary DB connection

// Load environment variables
dotenv.config();

// Connect to primary database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Set a static folder for file access
app.use(express.static(path.join(__dirname, 'public')));


// --- Route Files ---
const authRoutes = require('./routes/authRoutes');
const collegeAuthRoutes = require('./routes/collegeAuthRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const governmentRoutes = require('./routes/governmentRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const placementRoutes = require('./routes/placementRoutes');
const schoolRoutes = require('./routes/schoolRoutes');


// --- Mount Routers ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/college-auth', collegeAuthRoutes);
app.use('/api/v1', adminRoutes); // Includes /admissions/apply
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/government', governmentRoutes);
app.use('/api/v1/hostel', hostelRoutes);
app.use('/api/v1/placements', placementRoutes);
app.use('/api/v1/schools', schoolRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

