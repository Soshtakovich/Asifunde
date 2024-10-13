const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

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

        // Step 2: Get Subject IDs where the learner is enrolled
        const [enrollmentResults] = await db.query(`
            SELECT Subject_ID FROM Enrollment WHERE Learner_ID = ?`, 
            [learnerId]
        );

        const subjectIds = enrollmentResults.map(enrollment => enrollment.Subject_ID);

        if (subjectIds.length === 0) {
            return res.status(200).json([]); // No subjects found
        }

        // Step 3: Get Subject Names and Icons from Subjects table
        const [subjects] = await db.query(`
            SELECT Subject_Name AS Name, Icon AS iconClass 
            FROM Subjects 
            WHERE Subject_ID IN (?)`, 
            [subjectIds]
        );

        console.log("Subjects Data:", JSON.stringify(subjects, null, 2));
        res.status(200).json(subjects);

    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
