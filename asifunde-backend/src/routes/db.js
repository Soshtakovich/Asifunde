const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('../config/dbConfig');

const router = express.Router();

// Route to execute the SQL script from a file
router.post('/db_change', async (req, res) => {
    try {
        // Path to the SQL file (same directory as this JS file)
        const sqlFilePath = path.join(__dirname, 'kweri.sql'); 
        
        // Read the contents of the SQL file
        const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

        // Split the SQL script into individual statements (if you choose to)
        const statements = sqlScript.split(/;\s*$/gm).filter(Boolean); // Remove empty statements

        const connection = await db.getConnection();
        await connection.beginTransaction(); // Begin transaction

        // Execute each statement
        for (const statement of statements) {
            await connection.query(statement);
        }

        await connection.commit(); // Commit transaction
        res.status(200).json({ message: 'SQL script executed successfully.' });
    } catch (error) {
        console.error('Error executing SQL script:', error);
        await connection.rollback(); // Rollback transaction on error
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) connection.release(); // Release connection
    }
});

module.exports = router;
