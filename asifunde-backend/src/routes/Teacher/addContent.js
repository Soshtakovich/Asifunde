const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig'); // Adjust the path as necessary

// Route to add content
router.post('/', async (req, res) => {
    const { title, description } = req.body; // Get title and description from request body
    const teacherNumber = req.body.teacherNumber; // Get Teacher_Number from the request body

    if (!title || !teacherNumber) {
        return res.status(400).json({ message: 'Title and Teacher_Number are required.' });
    }

    try {
        // Get Teacher_ID from Teacher_Number
        const [teacher] = await db.query(
            'SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?',
            [teacherNumber]
        );

        // Log the teacher query result
        console.log('Teacher Query Result:', teacher); 

        if (!teacher || teacher.length === 0) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }

        const teacherID = teacher[0].Teacher_ID; // Get Teacher_ID

        // Get Subject_ID from Teacher_Subjects based on Teacher_ID
        const [subjects] = await db.query(
            'SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?',
            [teacherID]
        );

        // Log the subjects query result
        console.log('Subjects Query Result:', subjects);

        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this teacher.' });
        }

        // Assuming you want to insert content for the first subject
        const subjectID = subjects[0].Subject_ID;

        // Insert new content into Content table
        await db.query(
            'INSERT INTO Content (Subject_ID, Title, Description) VALUES (?, ?, ?)',
            [subjectID, title, description]
        );

        return res.status(201).json({ message: 'Content added successfully.' });
    } catch (error) {
        console.error('Error adding content:', error);
        return res.status(500).json({ message: 'Failed to add content.' });
    }
});

module.exports = router;
