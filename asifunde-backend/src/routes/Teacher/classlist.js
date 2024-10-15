const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');

// Route: /classlist/:teacherNumber
router.get('/:teacherNumber', async (req, res) => {
  try {
    // Step 1: Retrieve Teacher_Number from the request params
    const teacherNumber = req.params.teacherNumber;
    //console.log('Teacher_Number:', teacherNumber);

    // Step 2: Fetch Teacher_ID using Teacher_Number
    const [teacher] = await db.query(
      'SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?',
      [teacherNumber]
    );
    //console.log('Teacher Query Result:', teacher);

    if (!teacher || teacher.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const teacherID = teacher[0].Teacher_ID;

    // Step 3: Retrieve the Grades and Subjects the teacher teaches
    const [grades] = await db.query(
      'SELECT Grade_ID FROM Teacher_Grades WHERE Teacher_ID = ?',
      [teacherID]
    );
    console.log('Grades Query Result:', grades);

    const [subjects] = await db.query(
      'SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?',
      [teacherID]
    );
    //console.log('Subjects Query Result:', subjects);

    // Extract grade and subject IDs into arrays
    const gradeIDs = grades.map((g) => g.Grade_ID);
    const subjectIDs = subjects.map((s) => s.Subject_ID);

    //console.log('Grade IDs:', gradeIDs);
    //console.log('Subject IDs:', subjectIDs);

    // Handle empty arrays to avoid SQL errors
    if (gradeIDs.length === 0 || subjectIDs.length === 0) {
      return res.status(200).json({ message: 'No Grades or subjects found' });
    }

    // Step 4: Fetch the grade names based on the Grade_IDs
    const [gradeNames] = await db.query(
      `SELECT Grade_Name FROM Grades WHERE Grade_ID IN (?)`,
      [gradeIDs]
    );
    //console.log('Grade Names Query Result:', gradeNames);

    const gradeNamesList = gradeNames.map((g) => g.Grade_Name);

    // Step 5: Fetch learners in those grades using Grade_Name
    const [learners] = await db.query(
      `SELECT L.*, P.Cell_number AS Parent_Cell, P.Whatsapp_number AS Parent_Whatsapp
       FROM Learner L
       JOIN Parent P ON L.Learner_ID = P.Learner_ID
       WHERE L.Grade IN (?)`,
      [gradeNamesList]  // Use the grade names for the query
    );
    //console.log('Learners Query Result:', learners);

    if (learners.length === 0) {
      return res.status(200).json({ message: 'No learners found for the specified grades.' });
    }

    // Step 6: Fetch assessments for each learner and calculate average
    const learnerData = await Promise.all(
      learners.map(async (learner) => {
        const [assessments] = await db.query(
          `SELECT A.Assessment_ID, AM.Mark
           FROM Assessments A
           JOIN Assessment_Marks AM ON A.Assessment_ID = AM.Assessment_ID
           WHERE AM.Learner_ID = ? AND A.Subject_ID IN (?)`,
          [learner.Learner_ID, subjectIDs]
        );
        //console.log(`Assessments for Learner ${learner.Learner_ID}:`, assessments);

        const totalMarks = assessments.reduce((sum, a) => sum + a.Mark, 0);
        const average = assessments.length > 0 ? totalMarks / assessments.length : 0;

        return {
          ...learner,
          assessments: assessments.map((a) => a.Mark),
          average: average.toFixed(2),
        };
      })
    );

    //console.log('Final Learner Data:', learnerData);
    res.json(learnerData);

  } catch (error) {
    //console.error('Error fetching class list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
