const mongoose = require("mongoose");

const Document = mongoose.model(
  "Document",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    title: String,
    photo: { type: String, required: true },
    box_file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoxFile',
      required: true,
    }
  })
);

module.exports = Document;