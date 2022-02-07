const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageURL: String,
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
