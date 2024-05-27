// Libraries
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  

const getConnection = require("../config/connection.js");
const { default: mongoose } = require("mongoose");

// Create variables
const server = express();
const port = 4000;

// Mongo configuration
getConnection();

// JWT functions
const generateToken = (payload) => {
  const token = jwt.sign(payload, "secreto", { expiresIn: "1h" });
    return token;
  };

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "secreto");
    return decoded;
  } catch (err) {
    return null;
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Token inválido" });
  }

  req.user = decoded;
  next();
};

// Configuration
server.use(cors());
server.use(express.json({limit: "25mb"}));

// Initialize Express application
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// ENDPOINTS
const User = require("../config/users.model.js");
const Product  = require('../config/products.model.js');
const defaultCategories = require('../config/defaultCategories');

// Register user
server.post("/signup", async (req, res) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      success: false,
      error: "There cannot be empty fields",
    });
    return;
  }

  if (username.includes(" ") || password.includes(" ")) {
    res.status(400).json({
      success: false,
      error: "Fields cannot contain spaces",
    });
    return;
  }

  if (!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(email)) {
    res.status(400).json({
      success: false,
      error: "The email is invalid",
    });
    return;
  }

  try {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ username, email, password: passwordHash });
    await newUser.save();

    const productList = new Product({
      userId: newUser._id,
      product_list: defaultCategories
    });
    await productList.save();

    // Generate token for new user
    const token = generateToken({
      username: newUser.username,
      email: newUser.email,
      id: newUser._id
    });

    res.status(201).json({
      success: true,
      id: newUser._id,
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error creating new user (${error})`    
    });
  }
});

// Login user
server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      error: "There cannot be empty fields",
    });
    return;
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This username doesn't exist"
      });
    }

    // Compare password with hashed password
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate token for user
    const token = generateToken({
      username: user.username,
      id: user._id
    });

    res.status(200).json({
      success: true,
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error logging in user (${error})`
    });
  }
});

// Get product list by user
server.get("/products", async (req, res) => {
  const { userId } = req.query;

  try {
    // Find the user's product list
    const productList = await Product.findOne({ userId });

    if (!productList) {
      return res.status(400).json({
        success: false,
        message: "Product list not found for this user"
      });
    }

    return res.status(200).json({
      success: true,
      products: productList.product_list
    });

  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({
      success: false,
      message: `Error retrieving products (${error.message})`
    });
  }
});

// Add product to a category
server.post("/products", async (req, res) => {
  const { userId, category, product } = req.body;

  if (!userId || !category || !product) {
    res.status(400).json({
      success: false,
      error: "There cannot be empty fields",
    });
    return;
  }

  try {
    // Find the user's product list
    const productList = await Product.findOne({ userId });

    if (!productList) {
      return res.status(400).json({
        success: false,
        message: "Product list not found for this user"
      });
    }

    // Find the category and add the product
    const categoryIndex = productList.product_list.findIndex(cat => cat.category === category);

    if (categoryIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Category not found"
      });
    }

    productList.product_list[categoryIndex].products.push(product);
    await productList.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error adding product (${error})`
    });
  }
});

// Delete a product from a category
server.delete("/products/:userId/:category/:product", async (req, res) => {

  const { userId, category, product } = req.params;

  try {
    // Find product list
    const productList = await Product.findOne({ userId });

    if (!productList) {
      return res.status(400).json({
        success: false,
        message: "Product list not found for this user"
      });
    }

    // Find category
    const categoryIndex = productList.product_list.findIndex(cat => cat.category === category);

    if (categoryIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Category not found"
      });
    }

    // Find product index
    const productIndex = productList.product_list[categoryIndex].products.indexOf(product);

    if (productIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Product not found in this category"
      });
    }

    // Remove product from the array
    productList.product_list[categoryIndex].products.splice(productIndex, 1);

    // Save the updated product list
    await productList.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error deleting product (${error})`
    });
  }
});

// Server static files
server.use(express.static('../public'));