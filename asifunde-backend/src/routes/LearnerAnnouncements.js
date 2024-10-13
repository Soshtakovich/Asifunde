const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Helper function to format dates
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options); // Example: 20 September 2024
};

router.get('/:learnerNumber', async (req, res) => {
    const { learnerNumber } = req.params;

    try {
        // Step 1: Get Learner ID using Learner Number
        const [learnerResult] = await db.query(`
            SELECT Learner_ID FROM Learner WHERE Learner_Number = ?`, 
            [learnerNumber]
        );

        if (learnerResult.length === 0) {
            return res.status(404).json({ message: 'Learner not found' });
        }

        const learnerId = learnerResult[0].Learner_ID;

        // Step 2: Get Subjects where the learner is enrolled
        const [subjectResults] = await db.query(`
            SELECT s.Subject_ID, s.Subject_Name 
            FROM Enrollment e
            JOIN Subjects s ON e.Subject_ID = s.Subject_ID
            WHERE e.Learner_ID = ?`, [learnerId]);

        const subjectIds = subjectResults.map(subject => subject.Subject_ID);
        
        if (subjectIds.length === 0) {
            return res.status(200).json([]);
        }

        // Step 3: Get Announcements for the enrolled subjects
        const [announcementResults] = await db.query(`
            SELECT a.Subject_ID, a.Date, a.Content_Heading, a.Content 
            FROM Announcements a 
            WHERE a.Subject_ID IN (?)`, [subjectIds]);

        // Step 4: Group Announcements by Subject
        const announcementData = subjectResults.map(subject => ({
            name: subject.Subject_Name,
            announcements: announcementResults
                .filter(announcement => announcement.Subject_ID === subject.Subject_ID)
                .map(announcement => ({
                    details: [
                        { label: "Date", value: formatDate(announcement.Date), type: "date" },
                        { label: "Subject", value: announcement.Content_Heading, type: "subject" },
                        { label: "Content", value: announcement.Content, type: "info" },
                    ]
                }))
        }));

        //console.log("Final Announcement Data:", JSON.stringify(announcementData, null, 2));
        res.status(200).json(announcementData);

    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
