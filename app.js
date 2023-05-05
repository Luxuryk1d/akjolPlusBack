const express = require("express");

const app = express();
require("express-ws")(app);

const port = process.env.NODE_ENV === "test" ? 8020 : 8000;


module.exports = {app, port};