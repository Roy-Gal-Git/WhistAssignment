const mongoose = require("mongoose");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().lean();
  res.send(products);
});

router.post("/", async (req, res) => {
  let product = new Product(req.body);

  try {
    product = await product.save();
    res.send(product);
  } catch (err) {
    console.log(`[ERROR]: ${err.message}`);
  }
});

router.put("/", async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.body._id, req.body);

  if (!product) return res.status(404).send("[404]: Product not found.");

  res.send(product);
});

router.delete("/", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.body._id);

  if (!product) return res.status(404).send("404: Product not found."); // 404

  res.send(product);
});

module.exports = router;
