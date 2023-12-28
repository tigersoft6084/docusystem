const mongoose = require("mongoose");

const BoxFile = mongoose.model(
  "BoxFile",
  new mongoose.Schema({
    no: {
      type: Number,
      required: true,
    },
    name: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }
  })
);

module.exports = BoxFile;