const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const boxFileSchema = mongoose.Schema(
  {
    no: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Company'
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
boxFileSchema.plugin(toJSON);
boxFileSchema.plugin(paginate);

/**
 * @typedef BoxFile
 */
const BoxFile = mongoose.model('BoxFile', boxFileSchema);

module.exports = BoxFile;
