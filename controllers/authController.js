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

module.exports = {
  register
}