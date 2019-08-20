// dotenv must be required as early as possible for env vars to propogate
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const db = require('./database');
const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/projects/seabay/shopping-cart/app', express.static('client/dist'));

// http get /api/cart/items --> all cart items
app.get('/projects/seabay/shopping-cart/app/api/cart/items', (req, res) => {
  db.cart.get()
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(400).send());
});

// http get /api/cart/items/{id} --> single item from cart
app.get('/projects/seabay/shopping-cart/app/api/cart/items/:id', (req, res) => {
  db.cart.get({ id: req.params.id })
    .then((item) => res.status(200).send(item))
    .catch((err) => res.status(400).send());
});

// http post /api/cart/items/ --> single item to cart
app.post('/projects/seabay/shopping-cart/app/api/cart/items/', (req, res) => {
  db.cart.add({ id: req.body.id, quantity: req.body.quantity })
    .then(() => res.status(201).send())
    .catch((err) => res.status(400).send());
});

// http delete /api/cart/items/{id} --> delete single item from cart
app.delete('/projects/seabay/shopping-cart/app/api/cart/items/:id', (req, res) => {
  db.cart.remove({ id: req.params.id })
    .then(() => res.status(200).send())
    .catch((err) => res.status(400).send());
});

// http get /api/products/ --> all products
app.get('/projects/seabay/shopping-cart/app/api/products', (req, res) => {
  db.products.get()
    .then((products) => res.status(200).send(products))
    .catch((err) => res.status(400).send());
});

// http get /api/products/{id} --> dingle product from products
app.get('/projects/seabay/shopping-cart/app/api/products/:id', (req, res) => {
  db.products.get({ id: req.params.id })
    .then((product) => res.status(200).send(product))
    .catch((err) => res.status(400).send());
});

app.listen(port, () => console.log(`Server is running on ${port}`));

module.exports = app;