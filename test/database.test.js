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

// declare dummy data
const item = {
  "id": 17,
  "name":"! The Little Mermaid, ---> BOOK NOT FILM",
  "price": 48.27,
  "category":"Sea Books",
  "img1_url":"https://kbimages1-a.akamaihd.net/db354f34-652f-4c20-b9de-96cfb44bcaf7/353/569/90/False/the-little-mermaid-and-other-fairy-tales.jpg"
};
const filter = { id: item.id };
const update = { price: item.price * 2 };

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

  describe('methods.create()', () => {
    it('should return a promise', () => {
      methods.create(Products, {}).should.be.a('promise');
    });

    it('should create a document', async () => {
      await methods.create(Products, item);
      const [ result ] = await methods.get(Products, { id: item.id });
      result.should.exist;
      result.should.be.an('object');
      result.id.should.equal(item.id);
    });
  });

  describe('methods.update()', () => {
    it('should return a promise', () => {
      methods.update(Products, filter, update).should.be.a('promise');
    });

    it('should update a document', async () => {
      await methods.update(Products, filter, update);
      const [ actual ] = await methods.get(Products, filter);
      actual.price.should.not.equal(item.price);
    });
  });

  describe('methods.upsert()', () => {
    before((done) => {
      Products.deleteOne({ id: item.id })
      .then(() => done())
      .catch((err) => done(err));
    });
    it('should return a promise', () => {
      methods.upsert(Products).should.be.a('promise');
    });

    it('should create a document when it doesn\'t exist', async () => {
      await methods.upsert(Products, item, filter, update);
      const [ actual ] = await methods.get(Products, filter);
      actual.price.should.equal(item.price);
    });

    it('should update a document when it exists', async () => {
      await methods.upsert(Products, item, filter, update);
      const [ actual ] = await methods.get(Products, filter);
      actual.price.should.not.equal(item.price);
    });
  });
});
