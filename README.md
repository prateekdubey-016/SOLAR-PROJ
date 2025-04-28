# ☀️ Solar Energy ROI Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-blue)](https://www.mongodb.com/)

An intelligent web application that calculates solar panel investment returns with government subsidy integration and performance analytics.

🌟 Features

🔢 ROI Calculator: Users can estimate potential savings based on location, roof area, and electricity consumption patterns.

🏛️ Subsidy Integration: Automatic calculations incorporating the latest MNRE (Ministry of New and Renewable Energy) subsidy schemes to maximize user benefits.

👥 User Portal: Separate, dedicated dashboards for homeowners and technicians, enabling tailored experiences and improved service management.

📈 Real-time Analytics: Interactive data visualization powered by Chart.js to display projected energy savings and investment performance over time.

🗄️ MongoDB Backend: Secure storage of user data, contact form submissions, and system analytics using MongoDB Atlas.

📞 Contact and Support: Simple forms and backend storage for inquiries, technical support, and feedback collection.

🌐 Live Links (Deployment pending — ready for Netlify and Render or any preferred hosting platforms.)

## 🌐 Live Links

- **Frontend**: [solar-analysis Frontend](https://solar-analysis.netlify.app/))  
- **Backend**: [solar-analysis backend ](https://medwise-smart-healthcare.onrender.com/)


## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

**Frontend**

HTML5: Structuring responsive, clean web pages.

CSS3: Styling with a focus on user experience.

JavaScript: For dynamic, client-side interactivity.

Bootstrap: For responsive layouts and components.

**Backend**

Node.js: Backend server environment.

Express.js: RESTful API development.

MongoDB Atlas: Cloud database storage.

Mongoose: Object Data Modeling (ODM) for MongoDB.

**Hosting Recommendations**

Frontend: Netlify, Vercel, or similar.

Backend:
Render, Railway, or DigitalOcean App Platform.


**SOLAR-PROJ/**
├── public/             # Frontend static assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
├── models/             # MongoDB schemas for users and ROI data
├── routes/             # Express route definitions
├── .env.example        # Environment variable example
├── server.js           # Main backend server file
└── package.json        # Project dependencies and scripts

# Clone the repository
git clone https://github.com/prateekdubey-016/SOLAR-PROJ.git

# Navigate into the project directory
cd SOLAR-PROJ

# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env
# (Edit the .env file with your MongoDB URI and other credentials)
Running the Application
bash
Copy
Edit
# For development (with hot-reloading)
npm run dev

# For production
npm start

