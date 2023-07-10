const mongoose = require("mongoose");

const dbConnection = mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.qoffovv.mongodb.net/food?retryWrites=true&w=majority"
);

module.exports = {
  dbConnection,
};
