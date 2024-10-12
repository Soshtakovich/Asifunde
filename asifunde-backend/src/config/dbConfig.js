// src/config/dbConfig.js
const mysql = require('mysql2/promise'); // Use promise-based mysql2
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: false, // Adjust if needed
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const [rows] = await connection.query('SELECT 1');
    console.log('Database connection successful:', rows);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

module.exports = connection;
