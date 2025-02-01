const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const scrapRoutes = require('./routes/scrapRoutes');

// Create express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/scrap', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/scrap', scrapRoutes);  // Use scrapRoutes without passing upload

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
