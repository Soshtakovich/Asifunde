const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');
const multer = require('multer');
const fs = require('fs');

// Define the uploads directory
const uploadsDir = 'uploads/';

// Check if the uploads directory exists, and create it if it doesn't
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory recursively
    console.log('Uploads directory created successfully.');
  }
} catch (error) {
  console.error('Error creating uploads directory:', error);
}

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Use the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  },
});

const upload = multer({ storage });

// Route to add assessments
router.post('/', upload.single('file'), async (req, res) => {
  const { name, description, dueDate, totalMark, teacherNumber } = req.body; // Get teacherNumber from request body
  console.log('Received request to add assessment with the following data:', {
    name,
    description,
    dueDate,
    totalMark,
    teacherNumber,
  });

  try {
    // Fetch Teacher_ID from Teacher_Number
    console.log('Fetching Teacher_ID for Teacher_Number:', teacherNumber);
    const teacherResult = await db.query('SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?', [teacherNumber]);
    console.log('Query result:', teacherResult); // Log the result of the query
    
    // Access Teacher_ID from the correct structure
    const teacherID = teacherResult[0]?.[0]?.Teacher_ID; // Adjusted to access the first object in the array
    console.log('Retrieved Teacher_ID:', teacherID);

    // Check if teacherID was found
    if (!teacherID) {
      console.error('Teacher not found for the provided Teacher_Number.');
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    // Fetch Subject_ID for the teacher
    console.log('Fetching Subject_ID for Teacher_ID:', teacherID);
    const subjectResult = await db.query('SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?', [teacherID]);
    console.log('Subject query result:', subjectResult); // Log the result of the subject query

    const subjectID = subjectResult[0]?.[0]?.Subject_ID; // Adjusted to access the first object in the array
    console.log('Retrieved Subject_ID:', subjectID);

    if (!subjectID) {
      console.error('No subject found for the teacher.');
      return res.status(404).json({ message: 'Subject not found for the teacher.' });
    }

    // Create a link for the uploaded file
    const fileLink = `http://localhost:4000/uploads/${req.file.filename}`; // Adjust URL as necessary
    console.log('File uploaded successfully, file link:', fileLink);

    // Insert the new assessment into the database
    console.log('Inserting new assessment into the database...');
    const insertResult = await db.query(
      'INSERT INTO Assessments (Subject_ID, Name, Description, File_Link, DueDate, Total_Mark) VALUES (?, ?, ?, ?, ?, ?)',
      [subjectID, name, description, fileLink, dueDate, totalMark]
    );
    console.log('Assessment inserted successfully, Assessment_ID:', insertResult.insertId);

    res.status(201).json({ message: 'Assessment added successfully!', Assessment_ID: insertResult.insertId });
  } catch (error) {
    console.error('Error adding assessment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
