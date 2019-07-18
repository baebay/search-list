// invoke should assertion wrapper
const should = require('chai').should();

// require mongoose server and fake mongodb
const mongoose = require('mongoose');
const connection = mongoose.connection;
const { MongoMemoryServer } = require('mongodb-memory-server');

// require collection schemas, data, and helper methods
const { ProductSchema, CartItemSchema } = require('../server/database/schema');
const productData = require('./data/data');
const methods = require('../server/database/methods');

// declare models
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
  describe('methods.get()', () => {
    it('should return a promise', () => {
      methods.get(Products, {}).should.be.a('promise');
    });

    it('should query the passed in collection', async () => {
      const expected = await Products.find({});
      const actual = await methods.get(Products, {});
      actual.should.deep.equal(expected);
    });

    it('should default to a blank filter if none is passed', async () => {
      const expected = await Products.find();
      const actual = await methods.get(Products);
      actual.should.deep.equal(expected);
    });

    it('should query a collection based on a filter', async () => {
      const expected = await Products.findOne();
      const [ actual ] = await methods.get(Products, { id: expected.id });
      actual.name.should.equal(expected.name);
    });
  });
});
