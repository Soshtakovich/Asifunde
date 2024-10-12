const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');
const fs = require('fs');

router.post('/login', async (req, res) => {
  console.log('Received Login Request:', req.body);

  const { username, password } = req.body;
  
  if (!username || !password) {
    console.warn('Missing username or password');
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const [results] = await db.query(
      'SELECT * FROM Learner WHERE Username = ? AND Password = ?',
      [username, password]
    );

    console.log('Query Results:', results);

    if (results.length === 0) {
      console.warn('Invalid credentials');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const learner = results[0];
    const role = learner.Learner_Number.startsWith('BET') ? 'Learner' : 'Teacher';

    req.session.user = {
      username: learner.Username,
      learnerID: learner.Learner_ID,
      role,
    };

    const learnerData = {
      Learner_Number: learner.Learner_Number,
      Name: `${learner.Names} ${learner.Surname}`,
      Gender: learner.Gender,
      DOB: learner.DOB,
      Age: learner.Age,
      Contact: {
        Email: learner.Email,
        Cell: learner.Cell_number,
        Whatsapp: learner.Whatsapp_number,
      },
      Location: learner.Location,
      Grade: learner.Grade,
      School: learner.School,
    };

    const filePath = `./learnerData_${learner.Username}.json`;
    fs.writeFile(filePath, JSON.stringify(learnerData, null, 2), (err) => {
      if (err) {
        console.error('File writing error:', err);
        return res.status(500).json({ error: 'Failed to save learner data' });
      }

      console.log('File saved:', filePath);
      res.json({ message: 'Login successful', user: learnerData, role });
    });

  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;
