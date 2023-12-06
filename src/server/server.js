// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Import the data and ticker routers
const dataRouter = require('./routes/data');
const tickerRouter = require('./routes/tickers'); 

// Use the data and ticker routers
app.use('/data', dataRouter);
app.use('/tickers', tickerRouter); 

// Root route
app.get("/", (req, res) => {
  res.send(`Backend for example data serve`);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});

module.exports = app;
