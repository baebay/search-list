const mongoose = require('mongoose');
const connection = require('./config');
const { ProductSchema, CartItemSchema } = require('./schema');

// models
const CartItems = connection.model('cart_item', CartItemSchema);
const Products = connection.model('product', ProductSchema);

// // cart methods
// const cart = {
//   get: (item = {}) => {
//     return CartItems.find(item).exec();
//   },
//   add: (item) => {
//     let product;
//     let query;
//     return products.get({ id: item.id })
//       .then(([ productDetails ]) => product = productDetails)
//       .then(() => cart.get({ id: product.id }))
//       .then((cartQuery) => query = cartQuery)
//       .then(() => {
//         const cartItem = JSON.parse(JSON.stringify(product));
//         cartItem.quantity = item.quantity;

//         if (query.length === 0) {
//           return CartItems.create(cartItem)
//         }

//         const newQty = query[0].quantity + item.quantity;
//         return CartItems.updateOne({ id: product.id }, { quantity: newQty });
//       })
//       .catch(console.error);
//   },
//   remove: (item) => {
//     return CartItems.deleteOne(item).exec();
//   },
// };

// // product methods
// const products = {
//   get: (item = {}) => {
//     return Products.find(item).exec();
//   },
// };

