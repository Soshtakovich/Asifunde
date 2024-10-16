const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');

// Fetch assessments for a subject taught by a teacher
router.get('/:teacherNumber', async (req, res) => {
    const teacherNumber = req.params.teacherNumber;

    try {
        // Step 1: Fetch Teacher_ID using Teacher_Number
        const [teacherResults] = await db.query(
            'SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?',
            [teacherNumber]
        );

        if (!teacherResults || teacherResults.length === 0) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const teacherID = teacherResults[0].Teacher_ID;

        // Step 2: Get the Subject ID(s) associated with the Teacher
        const [subjectResults] = await db.query(
            'SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?',
            [teacherID]
        );

        const subjectIDs = subjectResults.map(subject => subject.Subject_ID);

        if (subjectIDs.length === 0) {
            return res.status(404).json({ message: 'No subjects found for this teacher' });
        }

        // Step 3: Fetch all assessments for the subjects taught by the teacher
        // Constructing a dynamic query for the IN clause
        const placeholders = subjectIDs.map(() => '?').join(', ');
        const [assessmentsResults] = await db.query(
            `SELECT 
                a.Assessment_ID,
                a.Name,
                a.Description,
                a.File_Link,
                a.DueDate,
                a.Total_Mark,
                (SELECT COUNT(*) FROM Assessment_Marks am WHERE am.Assessment_ID = a.Assessment_ID) AS submissions,
                (SELECT COUNT(*) FROM Assessment_Marks am WHERE am.Assessment_ID = a.Assessment_ID AND am.Mark IS NULL) AS not_submit
            FROM 
                Assessments a
            WHERE 
                a.Subject_ID IN (${placeholders})`, 
            subjectIDs  // Pass the subject IDs as parameters
        );

        // Debugging: Log the raw assessments data
       // console.log('Raw assessments data:', assessmentsResults);

        // Check if assessments exist
        if (assessmentsResults.length === 0) {
            return res.status(404).json({ message: 'No assessments found for the subjects taught by this teacher.' });
        }

        // Format the response data to exclude any binary data
// Format the response data to exclude any binary data
const formattedAssessments = assessmentsResults.map(assessment => {
    const dueDate = new Date(assessment.DueDate); // Create a Date object
    const formattedDate = dueDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',

    }); // Format the date as DD/MM/YYYY (or you can customize it)

    return {
        assessmentId: assessment.Assessment_ID,
        name: assessment.Name,
        description: assessment.Description,
        fileLink: assessment.File_Link,
        dueDate: formattedDate, // Use the formatted date
        totalMark: assessment.Total_Mark,
        submissions: assessment.submissions,
        notSubmitted: assessment.not_submit,
    };
});


        // Send the formatted response
        res.json(formattedAssessments);
    } catch (error) {
        console.error('Error fetching assessments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
