// Libraries
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const getConnection = require('../config/connection.js');
const { default: mongoose } = require('mongoose');

// Create variables
const server = express();
const port = 4000;

// Mongo configuration
getConnection();

// Configuration
server.use(cors());
server.use(express.json({limit: '25mb'}));

// Initialize Express application
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// Define endpoints
const Product  = require('../config/products.model.js');
const Category  = require('../config/categories.model.js');

// Product list
server.get('/api/products', async (req, res) => {

  const results = await Product.find();

  res.json(results);

});

// Category list
server.get('/api/categories', async (req, res) => {

  const results = await Category.find();

  res.json(results);

});

// Server static files
server.use(express.static('../public'));