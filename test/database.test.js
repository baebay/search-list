const should = require('chai').should();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const { MongoMemoryServer } = require('mongodb-memory-server');
const methods = require('../server/database/methods');
const { ProductSchema, CartItemSchema } = require('../server/database/schema');

const productData = require('./data/data');

let Products;

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

describe('Collection helper methods', () => {
  console.log(Products);
  describe('methods.get()', () => {

    it('Should return a promise', () => {
      methods.get(Products, {}).should.be.a('promise');
    });

    it('Should query the passed in collection', async () => {
      const expected = await Products.find({});
      const actual = await methods.get(Products, {});
      actual.should.deep.equal(expected);
    });

    it('Should default to a blank filter if none is passed', async () => {
      const expected = await Products.find();
      const actual = await methods.get(Products);
      actual.should.deep.equal(expected);
    });
  });
});