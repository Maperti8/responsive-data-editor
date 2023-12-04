const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    if (data && Array.isArray(data.stocks)) {
      // Get query parameters for pagination
      const start = parseInt(req.query.start) || 0;
      const limit = parseInt(req.query.limit) || 10;

      // Paginate the data
      const paginatedData = data.stocks.slice(start, start + limit);

      res.json({
        stocks: paginatedData,
        totalRecords: data.stocks.length
      });
    } else {
      console.error('Invalid data', data);
      res.status(500).json({ error: 'Internal Server Error - Invalid data' });
    }
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;