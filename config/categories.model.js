const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
{
  name: { type: String, required: true }
}, 
{
  collection: 'categories'
});

const Category = mongoose.model('categories', categorieSchema);

module.exports = Category;