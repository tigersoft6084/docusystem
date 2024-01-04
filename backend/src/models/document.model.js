const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const documentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    images: [
    {
      name: String,
      percent: Number,
      size: Number,
      status: {
        type: String,
        enum: ["error", "success", "done", "uploading", "removed"]
      },
      url: String
    }],
    boxFile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoxFile',
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
documentSchema.plugin(toJSON);
documentSchema.plugin(paginate);

/**
 * @typedef Document
 */
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
