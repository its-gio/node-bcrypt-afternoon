function usersOnly(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json("Please log in");
  }
}

function adminOnly(req, res, next) {
  if (req.session.user.isAdmin === true) {
    next();
  } else {
    res.status(403).json("You are not an admin")
  }
}

module.exports = {
  usersOnly,
  adminOnly
}