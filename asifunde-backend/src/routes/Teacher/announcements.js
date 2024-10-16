// routes/Teacher/announcements.js
const express = require('express');
const router = express.Router();
const db = require('../../config/dbConfig');

// Fetch announcements for a teacher
router.get('/:teacherNumber', async (req, res) => {
  const { teacherNumber } = req.params;

  try {
    const [teacher] = await db.query(
      'SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?',
      [teacherNumber]
    );

    if (teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacherId = teacher[0].Teacher_ID;

    const [subjects] = await db.query(
      'SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?',
      [teacherId]
    );

    if (subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    const subjectId = subjects[0].Subject_ID;

    const [announcements] = await db.query(
      'SELECT Content_Heading AS heading, Content AS message, Date FROM Announcements WHERE Subject_ID = ?',
      [subjectId]
    );

    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new announcement
router.post('/', async (req, res) => {
  const { teacherNumber, contentHeading, content } = req.body;

  try {
    const [teacher] = await db.query(
      'SELECT Teacher_ID FROM Teacher WHERE Teacher_Number = ?',
      [teacherNumber]
    );

    if (teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacherId = teacher[0].Teacher_ID;

    const [subjects] = await db.query(
      'SELECT Subject_ID FROM Teacher_Subjects WHERE Teacher_ID = ?',
      [teacherId]
    );

    if (subjects.length === 0) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    const subjectId = subjects[0].Subject_ID;

    await db.query(
      'INSERT INTO Announcements (Subject_ID, Date, Content_Heading, Content) VALUES (?, CURDATE(), ?, ?)',
      [subjectId, contentHeading, content]
    );

    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (error) {
    console.error('Error adding announcement:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
