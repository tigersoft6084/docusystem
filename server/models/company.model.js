const mongoose = require("mongoose");

const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: String,
  })
);

module.exports = Company;