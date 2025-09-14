# edumanage_student_management_system
EduManage : An Integrated Student Management ERP
A modern, scalable, and low-cost ERP system designed to centralize and streamline academic and administrative operations for educational institutions. This project was built to solve the challenges of data fragmentation in public colleges, providing a single source of truth for students, faculty, and government bodies.

🚀 Key Features
Multi-Role Portals: Secure, dedicated dashboards for different user roles:

🎓 Students: View grades, attendance, apply for jobs, and manage hostel complaints.

🏫 College Admins: Manage admissions, student data, and institutional reports.

🇮🇳 Government: A "Super Search" portal to verify any student's record across all institutions.

🏢 Placement Officers: Post job openings and track student placement activities.

🏨 Hostel Wardens: Manage room allocations and resolve student complaints.

Centralized Admissions: A public-facing online application form with secure document uploads via Cloudinary.

Secure & Isolated Authentication: A separate, dedicated database and authentication system for college administrative accounts, ensuring high security.

Comprehensive Modules: Integrated systems for placement management and hostel complaint resolution.

RESTful API Backend: A decoupled backend built with Node.js and Express, ready to serve any frontend (web or mobile).

🛠️ Tech Stack & Architecture
This project uses a modern, robust, and scalable technology stack.

Backend
Runtime: Node.js

Framework: Express.js

Database: MongoDB (with Mongoose) - Utilizes a multi-database architecture.

Authentication: JSON Web Tokens (JWT) & bcrypt.js

File Storage: Cloudinary for cloud-based media management.

File Handling: Multer for processing uploads.

Frontend Prototype
Structure: HTML5

Styling: Tailwind CSS

Interactivity: Vanilla JavaScript (for API connections)

Architecture
The application is built on a decoupled (or headless) architecture. The backend is a pure RESTful API that serves JSON data, making it completely independent of the frontend.

📂 Project Structure
The project is organized into a clean, scalable structure following MVC (Model-View-Controller) principles.

eduverse-hub/
├── config/             # Database & service configurations
├── controllers/        # Application logic
├── middleware/         # Security and file upload middleware
├── models/             # Mongoose database schemas
├── public/             # Static assets (uploads)
├── routes/             # API endpoint definitions
├── .env.example        # Template for environment variables
├── server.js           # Main server entry point
└── package.json

🏁 Getting Started
Follow these steps to get the project running on your local machine.

Prerequisites
Node.js (v18 or higher recommended)

npm (comes with Node.js)

Git

A MongoDB Atlas account (for the databases)

A Cloudinary account (for file storage)

Installation & Setup
Clone the repository:

git clone [https://github.com/your-username/eduverse-hub.git](https://github.com/your-username/eduverse-hub.git)
cd eduverse-hub

Install backend dependencies:

npm install

Set up environment variables:

Create a file named .env in the root of the project.

Copy the contents of .env.example (if provided) or add the following variables, filling in your own credentials:

# Server Port
PORT=5000

# Database URIs
MONGO_URI=your_primary_mongodb_connection_string
COLLEGE_DB_URI=your_secondary_college_db_connection_string

# Security
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Run the server:

npm start

The backend API should now be running on http://localhost:5000.

Run the frontend:

The provided HTML files can be opened directly in your browser. For the best experience, use a live server extension (like the one in VS Code).

📄 API Endpoints
A brief overview of the main API endpoints available.

Method

Endpoint

Description

Access

POST

/api/v1/auth/login

Login for main users.

Public

POST

/api/v1/college-auth/register

Register a new college.

Public

POST

/api/v1/admissions/apply

Submit a student admission application.

Public

GET

/api/v1/students/dashboard

Get data for the student dashboard.

Student

GET

/api/v1/government/search

Search for a student globally.

Government

POST

/api/v1/placements/jobs

Create a new job posting.

Placement

POST

/api/v1/hostel/complaints

Submit a new hostel complaint.

Student

🔭 Future Scope
Real-time Notifications: Implement WebSockets for real-time updates on application statuses and notices.

Advanced Analytics: Build detailed analytics dashboards for college admins and government officials.

Fee Payment Integration: Integrate a payment gateway (like Stripe or Razorpay) for online fee collection.

Mobile Application: Develop a native mobile app (React Native or Flutter) that consumes the same backend API.

🤝 Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
This project is licensed under the MIT License.
