const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/data', async (req, res) => {
  try {
    // Assuming the 'data.json' file is in the 'assets' folder
    const filePath = path.join(__dirname, '../data/data.json');

    // Read the content of the JSON file
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse the JSON content
    const data = JSON.parse(fileContent);

    // Send the data as JSON
    res.json(data);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
