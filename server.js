require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// ... (keep all your existing requires and middleware code above)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to DB:', mongoose.connection.db.databaseName);
});

// Contact Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  interest: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema, 'solarisai'); // Note the collection name

// Routes
app.get('/login-user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login-user.html'));
});

app.get('/login-technician', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login-technician.html'));
});

// API endpoints
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;
    
    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields'
      });
    }

    // Create and save contact
    const newContact = await Contact.create({
      name,
      email,
      phone: phone || 'Not provided',
      interest: interest || 'General inquiry',
      message: message || 'No message provided'
    });

    console.log('📩 New contact saved:', newContact);
    
    res.json({
      success: true,
      message: 'Thank you for contacting us!',
      data: newContact
    });

  } catch (error) {
    console.error('❌ Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
});

// ====== ADD DEBUG ROUTES HERE ======
app.get('https://solar-proj.onrender.com/api/debug-data', async (req, res) => {
  try {
    const data = await mongoose.connection.db.collection('solarisai').find().toArray();
    res.json({
      db: mongoose.connection.db.databaseName,
      collection: 'solarisai',
      count: data.length,
      sample: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('https://solar-proj.onrender.com/api/debug-collections', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      db: mongoose.connection.db.databaseName,
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ====== END DEBUG ROUTES ======

// Keep all your existing login routes below...
app.post('/api/login-user', (req, res) => { /* ... */ });
app.post('/api/login-technician', (req, res) => { /* ... */ });

// ====== FINAL SERVER START ======
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});