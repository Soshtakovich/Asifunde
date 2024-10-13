const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); // MySQL configuration import

router.get('/:subjectName/:learnerNumber', async (req, res) => {
    const { subjectName, learnerNumber } = req.params;

    try {
        // Step 1: Get Subject_ID from the provided Subject Name
        const [subjectResult] = await db.query(
            `SELECT Subject_ID FROM Subjects WHERE Subject_Name = ?`,
            [subjectName]
        );

        if (subjectResult.length === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        const subjectId = subjectResult[0].Subject_ID;

        // Step 2: Get Learner_ID from the provided Learner Number
        const [learnerResult] = await db.query(
            `SELECT Learner_ID FROM Learner WHERE Learner_Number = ?`,
            [learnerNumber]
        );

        if (learnerResult.length === 0) {
            return res.status(404).json({ error: 'Learner not found' });
        }
        const learnerId = learnerResult[0].Learner_ID;

        // Step 3: Fetch Assessments and Marks for the Learner in this Subject
        const [assessments] = await db.query(
            `SELECT 
                a.Assessment_ID, a.Name, a.Description, 
                a.File_Link, a.DueDate, a.Total_Mark 
             FROM Assessments a 
             WHERE a.Subject_ID = ?`,
            [subjectId]
        );

        const formattedAssessments = await Promise.all(
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
                    status: 'Completed', // Always 'Completed'
                };
            })
        );

        // Step 4: Fetch Content with Sub_Content for the Subject
        const [content] = await db.query(
            `SELECT Content_ID, Title, Description 
             FROM Content 
             WHERE Subject_ID = ?`,
            [subjectId]
        );

        const formattedContent = await Promise.all(
            content.map(async (contentItem) => {
                const [subContent] = await db.query(
                    `SELECT Sub_Title, Description, Link 
                     FROM Sub_Content 
                     WHERE Content_ID = ?`,
                    [contentItem.Content_ID]
                );

                return {
                    title: contentItem.Title,
                    description: contentItem.Description,
                    subContent: subContent.map(sub => ({
                        subTitle: sub.Sub_Title,
                        description: sub.Description,
                        link: sub.Link
                    }))
                };
            })
        );

        // Step 5: Fetch Announcements for the Subject
        const [announcements] = await db.query(
            `SELECT Content_Heading, Content 
             FROM Announcements 
             WHERE Subject_ID = ?`,
            [subjectId]
        );

        // Step 6: Send the Combined Response
        res.json({
            assessments: formattedAssessments,
            content: formattedContent,
            announcements,
        });
    } catch (error) {
        console.error('Error fetching subject data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
