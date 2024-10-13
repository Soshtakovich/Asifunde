const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

router.get('/:learnerNumber', async (req, res) => {
    const { learnerNumber } = req.params;

    try {
        // Step 1: Get Learner Information
        const [learnerResult] = await db.query(`
            SELECT Learner_ID, Names, Surname, Grade 
            FROM Learner
            WHERE Learner_Number = ?`, [learnerNumber]);

        if (learnerResult.length === 0) {
           // console.log('Learner not found:', learnerNumber);
            return res.status(404).json({ message: 'Learner not found' });
        }

        const learner = learnerResult[0]; // Destructure the learner
        const learnerId = learner.Learner_ID;
        const learnerName = `${learner.Names} ${learner.Surname}`;
        const grade = learner.Grade;

       // console.log("Learner Data:", learner);

        // Step 2: Get Subjects where the learner is enrolled
        const [subjectResults] = await db.query(`
            SELECT s.Subject_ID, s.Subject_Name 
            FROM Enrollment e
            JOIN Subjects s ON e.Subject_ID = s.Subject_ID
            WHERE e.Learner_ID = ?`, [learnerId]);

        const subjects = subjectResults.map((subject) => ({
            id: subject.Subject_ID,
            name: subject.Subject_Name,
        }));

        //console.log("Enrolled Subjects:", subjects);

        // Step 3: Get Assessment Marks
        const assessmentsPromises = subjects.map(async (subject) => {
            const [marks] = await db.query(`
                SELECT Mark 
                FROM Assessment_Marks am
                JOIN Assessments a ON am.Assessment_ID = a.Assessment_ID
                WHERE am.Learner_ID = ? AND a.Subject_ID = ?`, 
                [learnerId, subject.id]);

            return {
                subject: subject.name || "No Subject Name",
                assessments: marks.length ? marks.map(mark => mark.Mark || 0) : [0]
            };
        });

        const academics = await Promise.all(assessmentsPromises);
       // console.log("Academic Data:", academics);

        // Step 4: Get Learner's Progress Info
        const [progressResults] = await db.query(`
            SELECT Position_Class, Average_Mark, Attendance_Perc 
            FROM Learner_Progress 
            WHERE Learner_ID = ?`, [learnerId]);

        const progress = progressResults[0] || {};
     //   console.log("Progress Data:", progress);

        const attendance = progress.Attendance_Perc || 0;
        const position = progress.Position_Class || 0;

        // Step 5: Create Leaderboard
        const [leaderboardResults] = await db.query(`
            SELECT l.Names, l.Surname, lp.Position_Class, lp.Average_Mark
            FROM Learner l
            JOIN Learner_Progress lp ON l.Learner_ID = lp.Learner_ID
            WHERE l.Grade = ?
            ORDER BY lp.Average_Mark DESC`, [grade]);

        const leaderboard = leaderboardResults.map((entry, index) => ({
            position: index + 1,
            name: `${entry.Names} ${entry.Surname}`,
            mark: entry.Average_Mark || 0,
        }));

      //  console.log("Formatted Leaderboard:", leaderboard);

        // Step 6: Prepare Final Response Data
        const learnerData = {
            name: learnerName,
            learnerNumber,
            grade,
            position,
            attendance,
            academics,
            leaderboard
        };

      //  console.log("Final Response Data:", learnerData);
        res.status(200).json(learnerData);

    } catch (error) {
        console.error('Error fetching learner progress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
