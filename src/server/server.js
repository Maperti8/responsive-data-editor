// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Import the routers
const dataRouter = require('./routes/data-get');
const dataSaveRouter = require('./routes/data-save');
const tickerRouter = require('./routes/tickers'); 

// Use the routes
app.use('/data', dataRouter);
app.use('/tickers', tickerRouter); 
app.use('/data/update', dataSaveRouter);

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
