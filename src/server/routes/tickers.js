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
      const stocks = data.stocks.map((stock, index) => ({
        label: stock.symbol,
        id: stock.symbol, 
      }));

      res.json(stocks);
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
