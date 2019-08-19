// const should = require('chai').should();
// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;
// let db;
// let models;

// before((done) => {
//   mongoServer = new MongoMemoryServer();
//   mongoServer
//     .getConnectionString()
//     .then((mongoUri) => {
//       process.env.DB_URI = mongoUri;
//       mongoose.connect(mongoUri, { useNewUrlParser: true });
//     })
//     .then(() => db = require('../server/database'))
//     .then(() => models = require('../server/database/models'))
//     .then(() => done())
//     .catch((err) => done(err));
// });

// after((done) => {
//   mongoose.disconnect();
//   mongoServer.stop();
//   done();
// });

// describe('Database helper functions', () => {
//   const data = require('./data/databaseData');
//   describe('Cart.get()', () => {
//     before((done) => {
//       models.CartItems.insertMany(data)
//       .then(() => done())
//       .catch((err) => console.error(err));
//     });

//     it('should return a promise', () => {
//       const get = db.cart.get();
//       get.should.be.a('promise');
//     });

//     it('should return all cart items if parameter is blank', async () => {
//       const expected = await models.CartItems.find();
//       const actual = await db.cart.get();
//       actual.length.should.be.equal(expected.length);
//     });
//   });
// });