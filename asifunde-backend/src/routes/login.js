const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const fs = require('fs');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  let user = null;
  let role = null;

  try {
    // Check in Learner table first
    const [learnerResults] = await db.query(
      'SELECT * FROM Learner WHERE Username = ?',
      [username]
    );

    if (learnerResults.length > 0) {
      user = learnerResults[0];
      role = user.Learner_Number.startsWith('BET') ? 'Learner' : 'Unknown';
    } else {
      // If not found, check in Teacher table
      const [teacherResults] = await db.query(
        `SELECT T.*, 
                GROUP_CONCAT(DISTINCT G.Grade_Name) AS Grades, 
                GROUP_CONCAT(DISTINCT S.Subject_Name) AS Subjects
         FROM Teacher T
         LEFT JOIN Teacher_Grades TG ON T.Teacher_ID = TG.Teacher_ID
         LEFT JOIN Grades G ON TG.Grade_ID = G.Grade_ID
         LEFT JOIN Teacher_Subjects TS ON T.Teacher_ID = TS.Teacher_ID
         LEFT JOIN Subjects S ON TS.Subject_ID = S.Subject_ID
         WHERE T.Username = ?
         GROUP BY T.Teacher_ID`,
        [username]
      );

      if (teacherResults.length > 0) {
        user = teacherResults[0];
        role = user.Teacher_Number.startsWith('TBET') ? 'Teacher' : 'Unknown';
      }
    }

    if (!user || role === 'Unknown') {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify the password using bcrypt
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Handle role-based login logic
    if (role === 'Learner') {
      const learnerData = {
        Learner_Number: user.Learner_Number,
        Name: `${user.Names} ${user.Surname}`,
        Gender: user.Gender,
        DOB: user.DOB,
        Age: user.Age,
        Contact: {
          Email: user.Email,
          Cell: user.Cell_number,
          Whatsapp: user.Whatsapp_number,
        },
        Location: user.Location,
        Grade: user.Grade,
        School: user.School,
      };

      req.session.user = { username: user.Username, role };
      fs.writeFile(
        `./learnerData_${user.Username}.json`,
        JSON.stringify(learnerData, null, 2),
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to save learner data' });
          }
          res.json({ message: 'Login successful', user: learnerData, role });
        }
      );
    } else if (role === 'Teacher') {
      const teacherData = {
        Teacher_Number: user.Teacher_Number,
        Name: `${user.Names} ${user.Surname}`,
        Gender: user.Gender,
        DOB: user.DOB,
        Age: user.Age,
        Contact: {
          Email: user.Email,
          Cell: user.Cell_number,
          Whatsapp: user.Whatsapp_number,
        },
        Grades: user.Grades ? user.Grades.split(',') : [],
        Subjects: user.Subjects ? user.Subjects.split(',') : [],
      };

      req.session.user = { username: user.Username, role };
      res.json({ message: 'Login successful', user: teacherData, role });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
