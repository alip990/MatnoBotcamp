const express = require("express");
const app = express();

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
