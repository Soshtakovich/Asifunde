const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Route to get all assessments for a specific learner based on Learner_Number
router.get('/:learnerNumber', async (req, res) => {
    const learnerNumber = req.params.learnerNumber;

    try {
        // Step 1: Get Learner_ID from Learner_Number
        const [learnerResult] = await db.query(
            `SELECT Learner_ID FROM Learner WHERE Learner_Number = ?`,
            [learnerNumber]
        );

        if (learnerResult.length === 0) {
            return res.status(404).json({ error: 'Learner not found' });
        }

        const learnerId = learnerResult[0].Learner_ID;

        // Step 2: Get Subject_IDs where the learner is enrolled
        const [enrollmentResults] = await db.query(
            `SELECT Subject_ID FROM Enrollment WHERE Learner_ID = ?`,
            [learnerId]
        );

        if (enrollmentResults.length === 0) {
            return res.status(404).json({ error: 'No enrolled subjects found' });
        }

        const subjectIds = enrollmentResults.map(row => row.Subject_ID);

        // Step 3: Fetch assessments for the enrolled subjects
        const [assessments] = await db.query(
            `SELECT 
                a.Assessment_ID, a.Name, a.Description, 
                a.File_Link, a.DueDate, a.Total_Mark 
            FROM Assessments a 
            WHERE a.Subject_ID IN (?)`,
            [subjectIds]
        );

        if (assessments.length === 0) {
            return res.status(404).json({ error: 'No assessments found' });
        }

        // Step 4: Format the assessment data and get marks
        const formattedData = await Promise.all(
            assessments.map(async (assessment) => {
                const [markRecord] = await db.query(
                    `SELECT Mark 
                    FROM Assessment_Marks 
                    WHERE Assessment_ID = ? AND Learner_ID = ?`,
                    [assessment.Assessment_ID, learnerId]
                );

                const mark = markRecord.length > 0 ? markRecord[0].Mark : 'Not Marked';

                return {
                    name: assessment.Name,
                    description: assessment.Description,
                    fileLink: assessment.File_Link,
                    dueDate: assessment.DueDate.toISOString().split('T')[0], // Format date
                    totalMark: assessment.Total_Mark,
                    mark: mark,
                    status: 'Completed', // Status is always 'Completed'
                };
            })
        );

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
