const mongoose = require("mongoose");

let db = "mongodb://localhost:27017/Whist";
module.exports = function () {
  mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));
};
