# ☀️ Solar Energy ROI Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-blue)](https://www.mongodb.com/)

An intelligent web application that calculates solar panel investment returns with government subsidy integration and performance analytics.

## ✨ Features
- **ROI Calculator**: Estimate savings based on location, roof area, and energy bills
- **Subsidy Integration**: Automatic MNRE scheme calculations
- **User Portal**: Separate interfaces for homeowners and technicians
- **Real-time Analytics**: Chart.js visualizations of energy savings
- **MongoDB Backend**: Secure data storage for contact forms and user data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Installation
```bash
# Clone repository
git clone https://github.com/prateekdubey-016/SOLAR-PROJ.git

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

Running the App
bash
Copy
# Development mode
npm run dev

# Production mode
npm start
📂 Project Structure
Copy
SOLAR-PROJ/
├── public/             # Frontend assets
│   ├── css/
│   ├── js/
│   └── images/
├── models/             # MongoDB schemas
├── routes/             # Express routes
├── .env.example        # Environment template
├── server.js           # Backend entry point
└── package.json
