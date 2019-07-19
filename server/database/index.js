const mongoose = require('mongoose');
const connection = require('./config');
const { ProductSchema, CartItemSchema } = require('./schema');

// models
const CartItems = connection.model('cart_item', CartItemSchema);
const Products = connection.model('product', ProductSchema);

// collection methods
const methods = require('./methods');

// cart interface
const cart = {
  get: (filter) => methods.get(CartItems, filter),
  add: async (item) => {
    const array = await methods.get(Products, { id: item.id });
    const document = JSON.parse(JSON.stringify(array[0]));
    delete document._id;
    document.quantity = item.quantity;
    return methods.upsert(
      CartItems,
      document,
      { id: item.id },
      { $inc: { "quantity": item.quantity }}
    );
  },
};

// product interface
const products = {
  get: (filter) => methods.get(Products, filter),
};

module.exports = { cart, products };