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

// ENDPOINTS

// PRODUCTS
const Product  = require('../config/products.model.js');

// Product list
server.get('/api/products', async (req, res) => {

  const results = await Product.find();
  res.json(results);
});

// Create product
server.post('/api/products', async (req, res) => {

  console.log(req.body);

  try {
    const newProduct = new Product(req.body);
    newProduct.save();
    res.json({
        success: true,
        id: newProduct._id
    });
  }
  catch( error ) {
    console.log(error);
    res.status(501).json({
        success: false,
        message: `Database error (${error})`
    });
  }
});

// Delete product
server.delete('/api/products/:id', async (req, res) => {

  try {
    await Product.deleteOne( {_id: req.params.id} );
    res.json({
      success: true
    });
  }
  catch( error ) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: `Database error (${error})`
    });
  }
});

// CATEGORIES
const Category  = require('../config/categories.model.js');

// Category list
server.get('/api/categories', async (req, res) => {

  const results = await Category.find();
  res.json(results);
});

// Create category
server.post('/api/categories', async (req, res) => {

  console.log(req.body);

  try {
    const newCategory = new Category(req.body);
    newCategory.save();
    res.json({
      success: true,
      id: newProduct._id
    });
  }
  catch( error ) {
    console.log(error);
    res.status(501).json({
        success: false,
        message: `Database error (${error})`
    });
  }
});

// Update category
server.put('/api/categories/:id', async (req, res) => {

  try {
    await Category.updateOne({_id: req.params.id }, req.body);
    res.json({
      success: true
    });
  }
  catch( error ) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: `Database error (${error})`
    });
  }
});

// Delete category
server.delete('/api/categories/:id', async (req, res) => {

  try {
    await Category.deleteOne( {_id: req.params.id} );
    res.json({
      success: true
    });
  }
  catch( error ) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: `Database error (${error})`
    });
  }
});

// Server static files
server.use(express.static('../public'));