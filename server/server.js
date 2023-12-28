const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const db = require("./models");

// var corsOptions = {
//   origin: process.env.FRONTEND_ORIGIN
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nikola's application." });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});