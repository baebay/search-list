const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  category: String,
  img1_url: String
});

const CartItemSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  category: String,
  img1_url: String,
  quantity: Number,
});

module.exports = { ProductSchema, CartItemSchema };