const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
{
  name: { type: String, required: true },
  category: { type: String, required: true }
}, 
{
  collection: 'products'
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
