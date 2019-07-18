const should = require('chai').should();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const Schema = mongoose.Schema;
const { MongoMemoryServer } = require('mongodb-memory-server');
const model = require('../server/database/model');

const productData = require('./data/data');

let Products;

const ProductSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  category: String,
  img1_url: String
});



before((done) => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then((uri) => {
      mongoose.connect(uri, { useNewUrlParser: true });
    })
    .then(() => Products = connection.model('product', ProductSchema))
    .then(() => Products.insertMany(productData))
    .then(() => done())
    .catch((err) => done(err));
});

after(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('Model helper methods', () => {
  console.log(Products);
  describe('model.get()', () => {

    it('Should return a promise', () => {
      model.get(Products, {}).should.be.a('promise');
    });

    it('Should query the passed in collection', async () => {
      const expected = await Products.find({});
      const actual = await model.get(Products, {});
      actual.should.deep.equal(expected);
    });

    it('Should default to a blank filter if none is passed', async () => {
      const expected = await Products.find();
      const actual = await model.get(Products);
      actual.should.deep.equal(expected);
    });
  });
});