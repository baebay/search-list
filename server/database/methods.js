const mongoose = require('mongoose');

module.exports = {
  get: (model, filter) => {
    return model.find(filter).exec();
  }
}