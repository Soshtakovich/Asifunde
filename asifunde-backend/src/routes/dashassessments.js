const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Route to get assessments data for a specific learner
router.get('/:learnerNumber', async (req, res) => {
    //console.log(`Received request for learnerNumber: ${req.params.learnerNumber}`);
    try {
        const { learnerNumber } = req.params;
        const report = { learnerNumber, actions: [] }; // Store all reports

        //console.log(`Fetching assessments for learner: ${learnerNumber}`);

        // Step 1: Get Learner_ID from Learner_Number
        const [learnerResult] = await db.query(
            `SELECT Learner_ID FROM Learner WHERE Learner_Number = ?`,
            [learnerNumber]
        );
        report.actions.push({ step: 1, query: 'Get Learner_ID', result: learnerResult });

        if (learnerResult.length === 0) {
            const message = `Learner with number ${learnerNumber} not found`;
            report.actions.push({ error: message });
           // console.error(report);
            return res.status(404).json({ report, message });
        }

        const learnerId = learnerResult[0].Learner_ID;
        //console.log(`Learner ID found: ${learnerId}`);
        report.actions.push({ learnerId });

        // Step 2: Get Subject_IDs where the learner is enrolled
        const [enrollmentResults] = await db.query(
            `SELECT Subject_ID FROM Enrollment WHERE Learner_ID = ?`,
            [learnerId]
        );
        report.actions.push({ step: 2, query: 'Get Enrollments', result: enrollmentResults });

        if (enrollmentResults.length === 0) {
            const message = `No enrollments found for learner ID ${learnerId}`;
            report.actions.push({ error: message });
            //console.error(report);
            return res.status(404).json({ report, message });
        }

        const subjectIds = enrollmentResults.map(row => row.Subject_ID);
        //console.log(`Subjects found: ${JSON.stringify(subjectIds)}`);
        report.actions.push({ subjectIds });

        // Step 3: Fetch assessments and corresponding marks
        const [assessments] = await db.query(
            `SELECT A.Assessment_ID, A.Subject_ID, A.DueDate, S.Subject_Name
             FROM Assessments A
             JOIN Subjects S ON A.Subject_ID = S.Subject_ID
             WHERE A.Subject_ID IN (?)`,
            [subjectIds]
        );
        report.actions.push({ step: 3, query: 'Fetch Assessments', result: assessments });

        //console.log(`Assessments found: ${JSON.stringify(assessments)}`);

        // Step 4: Map assessments to desired format
        const assessmentsData = await Promise.all(
            assessments.map(async (assessment) => {
                const [marks] = await db.query(
                    `SELECT Submission_Date FROM Assessment_Marks 
                     WHERE Assessment_ID = ? AND Learner_ID = ?`,
                    [assessment.Assessment_ID, learnerId]
                );
                report.actions.push({ 
                    step: 'Fetch Marks', 
                    query: 'Get Marks', 
                    assessmentId: assessment.Assessment_ID, 
                    result: marks 
                });

                const isCompleted = marks.length > 0 && marks[0].Submission_Date !== null;
                const status = isCompleted ? "Complete" : "Incomplete";
                const statusClass = isCompleted ? "complete" : "process";
                const daysRemaining = Math.ceil(
                    (new Date(assessment.DueDate) - new Date()) / (1000 * 60 * 60 * 24)
                );

                const formattedAssessment = {
                    subject: assessment.Subject_Name,
                    image: `/images/subjects/${assessment.Subject_Name.toLowerCase()}.jpg`,
                    dueDate: assessment.DueDate.toISOString().split('T')[0],
                    status,
                    statusClass,
                    daysRemaining
                };
                report.actions.push({ step: 'Format Assessment', result: formattedAssessment });

                //console.log(`Formatted Assessment: ${JSON.stringify(formattedAssessment)}`);
                return formattedAssessment;
            })
        );

        report.actions.push({ step: 'Final Response', assessmentsData });
        //console.log('Final Report:', JSON.stringify(report, null, 2)); // Log the report

        res.json({ report, data: assessmentsData });
    } catch (error) {
        //console.error('Error fetching assessments data:', error);
        res.status(500).json({ report: { error: 'Server error', details: error.message } });
    }
});

module.exports = router;
