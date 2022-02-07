const express = require("express");
const cors = require("cors");
app = express();

app.use(
  cors({
    origin: "*",
  })
);

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 3001;
const server = app.listen(port);

module.exports = server;
