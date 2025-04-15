const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes
app.get('/login-user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login-user.html'));
});

app.get('/login-technician', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login-technician.html'));
});

// API endpoints
app.post('/api/contact', (req, res) => {
    console.log('Contact Form:', req.body);
    res.json({ message: 'Thank you for contacting us!' });
});

app.post('/api/login-user', (req, res) => {
    console.log('User login attempt:', req.body); // Add this for debugging
    const { email, password } = req.body;
    if (email === 'user@example.com' && password === '1234') {
        res.json({ success: true, message: 'User Login Successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/login-technician', (req, res) => {
    console.log('Technician login attempt:', req.body); // Add this for debugging
    const { technicianId, password } = req.body;
    if (technicianId === 'tech001' && password === 'abcd') {
        res.json({ success: true, message: 'Technician Login Successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
});