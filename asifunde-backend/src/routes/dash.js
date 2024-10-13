const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Route to fetch learner's progress and assessment data
router.get('/:learnerNumber', async (req, res) => {
    const learnerNumber = req.params.learnerNumber;
    //console.log('Learner_Number received:', learnerNumber); // Debugging log

    try {
        // Fetch Learner_ID using Learner_Number
        const [learner] = await db.query(`
            SELECT Learner_ID
            FROM Learner
            WHERE Learner_Number = ?
        `, [learnerNumber]);

        //console.log('Learner query result:', learner); // Debugging log

        // Check if the learner exists
        if (learner.length === 0) {
            console.error(`Learner not found for Learner_Number: ${learnerNumber}`);
            return res.status(404).json({ error: 'Learner not found' });
        }

        const learnerId = learner[0].Learner_ID;
        //console.log('Learner_ID:', learnerId); // Debugging log

        // Fetch data from Learner_Progress table
        const [progress] = await db.query(`
            SELECT Attendance_Perc, Social_score, Average_Mark
            FROM Learner_Progress
            WHERE Learner_ID = ?
        `, [learnerId]);

       // console.log('Progress query result:', progress); // Debugging log

        // Fetch total number of assessments from Assessment_Marks table
        const [assessments] = await db.query(`
            SELECT COUNT(*) AS totalAssessments
            FROM Assessment_Marks
            WHERE Learner_ID = ?
        `, [learnerId]);

        //console.log('Assessments query result:', assessments); // Debugging log

        // Send data back to the frontend
        res.json({
            progress: progress[0] || {}, // Return empty object if no progress found
            totalAssessments: assessments[0].totalAssessments || 0 // Return 0 if no assessments found
        });
    } catch (error) {
        console.error('Error fetching insights data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
