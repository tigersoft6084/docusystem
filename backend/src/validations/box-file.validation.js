const Joi = require('joi');
const { password, objectId, imageUrl } = require('./custom.validation');

const createBoxFile = {
  body: Joi.object().keys({
    no: Joi.number().required(),
    name: Joi.string().required(),
  }),
};

const getBoxFiles = {
  query: Joi.object().keys({
    no: Joi.number().allow(''),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBoxFile = {
  params: Joi.object().keys({
    boxFileId: Joi.string().custom(objectId),
  }),
};

const updateBoxFile = {
  params: Joi.object().keys({
    boxFileId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      no: Joi.number().required(),
      name: Joi.string().required(),
    })
    .min(1),
};

const deleteBoxFile = {
  params: Joi.object().keys({
    boxFileId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBoxFile,
  getBoxFiles,
  getBoxFile,
  updateBoxFile,
  deleteBoxFile,
};
