const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config(); 

const port = process.env.PORT;

const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});

app.get("/", (req, res) => {
  res.end(`Backend for example data serve`);
});

// Import the "products" router
const productsRouter = require('./routes/data');

app.use('/', productsRouter);

module.exports = app;