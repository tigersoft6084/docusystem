const Joi = require('joi');
const { objectId, imageUrl } = require('./custom.validation');

const createDocument = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    title: Joi.string().required(),
    images: Joi.array().items(Joi.object()).min(1),
    boxFile: Joi.object()
  }),
};

const getDocuments = {
  query: Joi.object().keys({
    q: Joi.string(),
    name: Joi.string(),
    title: Joi.string(),
    sortBy: Joi.string(),
    boxFile: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDocument = {
  params: Joi.object().keys({
    documentId: Joi.string().custom(objectId),
  }),
};

const updateDocument = {
  params: Joi.object().keys({
    documentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      title: Joi.string().required(),
      images: Joi.array().items(Joi.object()).min(1),
      boxFile: Joi.object()
    })
    .min(1),
};

const deleteDocument = {
  params: Joi.object().keys({
    documentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
};
