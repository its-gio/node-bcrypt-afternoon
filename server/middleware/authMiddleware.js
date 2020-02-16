function usersOnly(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("Please log in");
  }
}

module.exports = {
  usersOnly
}