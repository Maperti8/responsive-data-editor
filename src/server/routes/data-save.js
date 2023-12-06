const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.put('/stocks', async (req, res) => {
    console.log(req.body)
    console.log('backend!!!')
    try {
        console.log(req.body)
      const stockToUpdate = req.body;
      const filePath = path.join(__dirname, '../data/data.json');
      const data = await fs.readFile(filePath, 'utf8');
      let stocks = JSON.parse(data).stocks;
  
      const stockIndex = stocks.findIndex(s => s.id === stockToUpdate.id);
      if (stockIndex !== -1) {
        stocks[stockIndex] = { ...stocks[stockIndex], ...stockToUpdate };
        await fs.writeFile(filePath, JSON.stringify({stocks}, null, 2));
        res.status(200).json(stocks[stockIndex]);
      } else {
        res.status(404).send('Stock not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;