const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product_list: [{
    category: { type: String, required: true },
    color: { type: String, required: true },
    products: { type: [String], required: true }
  }]
}, {
  collection: "products"
});

const Product = mongoose.model("products", productListSchema);

module.exports = Product;
