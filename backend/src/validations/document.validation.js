const Joi = require('joi');
const { objectId, imageUrl } = require('./custom.validation');

const createDocument = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    title: Joi.string().required(),
    photo: Joi.string().required().custom(imageUrl),
    box_file: Joi.string().required().custom(objectId)
  }),
};

const getDocuments = {
  query: Joi.object().keys({
    name: Joi.string(),
    title: Joi.string(),
    sortBy: Joi.string(),
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
      name: Joi.string(),
      title: Joi.string().required(),
      photo: Joi.string().required().custom(imageUrl),
      box_file: Joi.string().required().custom(objectId)
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
