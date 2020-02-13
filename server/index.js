const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app
  .use(express.json())

app.listen(SERVER_PORT, () => console.log(`Rodger Rodger on port ${SERVER_PORT}`))