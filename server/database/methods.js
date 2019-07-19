const mongoose = require('mongoose');

const methods = {};

methods.get = (model, filter) => {
  return model.find(filter).exec();
};

methods.create = async (model, document) => {
  return model.create(document);
};

methods.update = (model, filter, update) => {
  return model.updateOne(filter, update).exec();
};

methods.upsert = async (model, document, filter, update) => {
  const result = await methods.get(model, filter);
  return result.length
    ? methods.update(model, filter, update)
    : methods.create(model, document);
};

module.exports = methods;