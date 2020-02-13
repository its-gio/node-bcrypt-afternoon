const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.error(err));

app
  .use(express.json())
  .use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
    })
  )

app.listen(SERVER_PORT, () => console.log(`Rodger Rodger on port ${SERVER_PORT}`))