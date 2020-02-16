const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { register, login, logout } = require("./controllers/authController");
const { dragonTreasure, getUserTreasure, addUserTreasure } = require("./controllers/treasureController");
const { usersOnly } = require("./middleware/authMiddleware");

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
  .post('/auth/register', register)
  .post('/auth/login', login)
  .get('/auth/logout', logout)
  .get('/api/treasure/dragon', dragonTreasure)
  .get('/api/treasure/user', usersOnly, getUserTreasure)
  .post('/api/treasure/user', usersOnly, addUserTreasure)

app.listen(SERVER_PORT, () => console.log(`Rodger Rodger on port ${SERVER_PORT}`))