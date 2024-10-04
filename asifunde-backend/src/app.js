const express = require('express');
const db = require('./config/dbConfig');

const app = express();

// Example route to test database connection
app.get('/test-db', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).send('Database query failed');
    } else {
      res.send('Database connection successful');
    }
  });
});

module.exports = app;
