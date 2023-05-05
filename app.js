const express = require("express");
const cors = require("cors");

const app = express();
require("express-ws")(app);

const port = process.env.NODE_ENV === "test" ? 8020 : 8000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


module.exports = {app, port};