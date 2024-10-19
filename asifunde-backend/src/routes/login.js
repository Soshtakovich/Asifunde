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

  console.log(`Attempting login for username: ${username}`);

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
      console.log(`Found learner with role: ${role}`);
    } else {
      // Check in Teacher table if learner not found
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
        console.log(`Found teacher with role: ${role}`);
      }
    }

    if (!user || role === 'Unknown') {
      console.log('Invalid username or role unknown');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Handle $2y$ to $2b$ prefix replacement for PHP bcrypt compatibility
    let storedHash = user.Password;
    if (storedHash.startsWith('$2y$')) {
      storedHash = storedHash.replace('$2y$', '$2b$');
    }

    console.log(`Comparing passwords for user: ${user.Username}`);
    const isMatch = await bcrypt.compare(password, storedHash);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    console.log(`Login successful for role: ${role}`);

    // Handle login logic for learner or teacher
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
