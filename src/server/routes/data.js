const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/products', async (req, res) => {
  res.send('products subpage');
});

module.exports = router;