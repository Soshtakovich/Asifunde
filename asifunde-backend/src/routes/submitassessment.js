const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Define the uploads directory
const uploadsDir = path.join(__dirname, '../uploads/');

// Check if the uploads directory exists, and create it if it doesn't
try {
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Uploads directory created successfully.');
    }
} catch (error) {
    console.error('Error creating uploads directory:', error);
}

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the uploads directory
    },
    filename: (req, file, cb) => {
        // Create a unique filename using timestamp
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Route to handle assessment submission
router.post('/:assessmentId', upload.single('file'), async (req, res) => {
    const { Learner_Number } = req.body; // Get Learner_Number from request body
    const { assessmentId } = req.params; // Get Assessment_ID from URL

    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    const filePath = req.file.path; // Get the uploaded file path

    try {
        // Get Learner_ID using Learner_Number
        const learnerQuery = 'SELECT Learner_ID FROM Learner WHERE Learner_Number = ?';
        const [learnerResult] = await db.query(learnerQuery, [Learner_Number]);

        if (!learnerResult || learnerResult.length === 0) {
            return res.status(404).send('Learner not found.');
        }

        const learnerId = learnerResult[0].Learner_ID;
        const submissionDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format

        // Insert or update submission in the Assessment_Marks table
        const insertOrUpdateQuery = `
            INSERT INTO Assessment_Marks (Assessment_ID, Learner_ID, Mark, Submission_Date, Submitted_file)
            VALUES (?, ?, NULL, ?, ?)
            ON DUPLICATE KEY UPDATE 
                Submission_Date = VALUES(Submission_Date),
                Submitted_file = VALUES(Submitted_file)
        `;

        await db.query(insertOrUpdateQuery, [assessmentId, learnerId, submissionDate, filePath]);

        res.status(200).send('Assessment submitted successfully!');
    } catch (error) {
        console.error('Error during submission:', error);
        res.status(500).send('An error occurred during submission.');
    }
});

module.exports = router;
