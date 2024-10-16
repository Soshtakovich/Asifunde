const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname); // Create a unique file name
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Endpoint to add a new subtopic
router.post('/', upload.single('file'), async (req, res) => {
    const { contentId, subTitle, description } = req.body; // Extract data from request body
    const link = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : null; // Construct the file link

    if (!contentId || !subTitle) {
        return res.status(400).json({ message: 'Content_ID and Sub_Title are required.' });
    }

    try {
        // Insert new subtopic into Sub_Content table
        const result = await db.query('INSERT INTO Sub_Content (Content_ID, Sub_Title, Description, Link) VALUES (?, ?, ?, ?)', [contentId, subTitle, description, link]);
        
        return res.status(200).json({ message: 'Subtopic added successfully', link });
    } catch (error) {
        console.error('Error adding subtopic:', error);
        return res.status(500).json({ message: 'Failed to add subtopic' });
    }
});

module.exports = router;
