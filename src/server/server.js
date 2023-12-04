const express = require("express");
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Import the data router
const dataRouter = require('./routes/data');

// Use the data router
app.use('/data', dataRouter);

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
