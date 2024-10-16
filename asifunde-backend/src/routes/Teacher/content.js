const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');

// Endpoint to get content and sub-content based on Teacher_Number
router.get('/:teacherNumber', async (req, res) => {
    const teacherNumber = req.params.teacherNumber; // Expecting Teacher_Number from query parameters

    if (!teacherNumber) {
        return res.status(400).json({ message: 'Teacher_Number is required.' });
    }

    try {
        // Query to get Teacher_ID from Teacher_Number
        const [teacherResults] = await db.query('SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?', [teacherNumber]);

        if (teacherResults.length === 0) {
            return res.status(404).json({ message: 'Teacher not found.' });
        }

        const teacherId = teacherResults[0].Teacher_ID;

        // Query to get Subject_ID(s) where the teacher is teaching
        const [subjectResults] = await db.query('SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?', [teacherId]);

        if (subjectResults.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this teacher.' });
        }

        // Collect all Subject_IDs
        const subjectIds = subjectResults.map(subject => subject.Subject_ID);
        console.log('Subject IDs:', subjectIds); // Log subject IDs

        // Construct placeholders for the IN clause
        const placeholders = subjectIds.map(() => '?').join(',');
        const contentQuery = `
            SELECT 
                c.Content_ID, c.Title, c.Description, 
                sc.Sub_Content_ID, sc.Sub_Title, sc.Description AS Sub_Description, sc.Link 
            FROM 
                Content c 
            LEFT JOIN 
                Sub_Content sc ON c.Content_ID = sc.Content_ID 
            WHERE 
                c.Subject_ID IN (${placeholders})
        `;

        // Query to get Content and Sub_Content
        const [contentResults] = await db.query(contentQuery, subjectIds);

        // Structure the response
        const structuredContent = contentResults.reduce((acc, content) => {
            const { Content_ID, Title, Description, Sub_Content_ID, Sub_Title, Sub_Description, Link } = content;

            // If content already exists, push to sub_content array
            if (!acc[Content_ID]) {
                acc[Content_ID] = {
                    Content_ID, // Include Content_ID in the response
                    Title,
                    Description,
                    Sub_Content: []
                };
            }

            // If there is sub-content, add it to the sub_content array
            if (Sub_Content_ID) {
                acc[Content_ID].Sub_Content.push({
                    Sub_Content_ID,
                    Sub_Title,
                    Sub_Description,
                    Link
                });
            }

            return acc;
        }, {});

        // Return structured content as an array
        res.json(Object.values(structuredContent));

    } catch (error) {
        console.error('Error during database operation:', error); // Log error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router; 
