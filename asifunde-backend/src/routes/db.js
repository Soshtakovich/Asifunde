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

        // Execute the SQL script
        await db.query(sqlScript);

        res.status(200).json({ message: 'SQL script executed successfully.' });
    } catch (error) {
        console.error('Error executing SQL script:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
