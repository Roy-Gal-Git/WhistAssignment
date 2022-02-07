const express = require("express");
const admin = require("../routes/admin");

module.exports = function (app) {
  app.use(express.json());
  app.use("/admin", admin);
};
