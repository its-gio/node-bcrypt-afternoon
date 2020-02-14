const bcrypt = require("bcryptjs");

async function register(req, res) {
  const { username, password, isAdmin} = req.body;
  const db = req.app.get("db");

  const result = await db.get_user(username);
  if (result.length !== 0) return res.status(409).json('Username taken');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const registeredUser = await db.register_user(isAdmin, username, hash);
  const user = registeredUser[0];
  req.session.user = { isAdmin: user.isAdmin, username: user.username, id: user.id };
  return res.status(201).json(req.session.user);
}

async function login(req, res) {
  const { username, password } = req.body;
  const db = req.app.get("db");

  const foundUser = await db.get_user(username);
  if (foundUser.length === 0) return res.status(409).json('User not found. Please register as a new user before logging in.');
  const user = foundUser[0]
  const isAuthenticated = await bcrypt.compare(password, user.hash);
  if (isAuthenticated === true) {
    req.session.user = { isAdmin: user.is_Admin, username: user.username, id: user.id }
    return res.status(200).send(req.session.user);
  }
  return res.status(403).json('Incorrect password');
}

module.exports = {
  register,
  login
}