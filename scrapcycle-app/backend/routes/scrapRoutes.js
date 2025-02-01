const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Scrap = require('../models/Scrap'); // Import Scrap model

// Setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set filename to be unique
  },
});

const upload = multer({ storage: storage }); // Create upload middleware using multer

// POST route to add a new scrap item with image upload
router.post('/', upload.single('image'), (req, res) => {
  const newScrap = new Scrap({
    category: req.body.category,
    subCategory: req.body.subCategory,
    price: req.body.price,
    location: req.body.location,
    weight: req.body.weight,
    image: req.file ? req.file.path : null, // Store file path if image uploaded
  });

  newScrap.save()
    .then((scrap) => {
      res.status(201).json(scrap);
    })
    .catch((err) => {
      res.status(400).json({ message: 'Error saving scrap', error: err });
    });
});

// GET route to fetch all scrap items
router.get('/', (req, res) => {
  Scrap.find()
    .then((scraps) => res.json(scraps))
    .catch((err) => res.status(500).json({ message: 'Error fetching scraps', error: err }));
});

// Export router
module.exports = router;
