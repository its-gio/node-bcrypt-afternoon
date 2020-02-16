async function dragonTreasure(req, res) {
  const db = req.app.get("db");
  const result = await db.get_dragon_treasure('1');
  res.status(200).json(result);
}

async function getUserTreasure(req, res) {
  const db = req.app.get("db");
  const { id } = req.session.user;

  const result = await db.get_user_treasure(id);
  res.status(200).json(result);
}

async function addUserTreasure(req, res) {
  const { treasureURL } = req.body;
  const { id } = req.session.user;
  const db = req.app.get("db");
  const userTreasure = await db.add_user_treasure(treasureURL, id);

  res.status(200).json(userTreasure);
}

async function getAllTreasure(req, res) {
  const db = req.app.get("db");
  const result = await db.get_all_treasure();

  res.status(200).json(result);
}

module.exports = {
  dragonTreasure,
  getUserTreasure,
  addUserTreasure,
  getAllTreasure
}