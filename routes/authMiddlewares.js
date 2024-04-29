module.exports = {
  checkIfAuthorized: function (req, res, next) {
    if (req.user.role === "admin" || req.user.role === "member") {
      next();
    } else {
      res.status(403).send(new Error("Access denied."));
    }
  },

  isAdmin: function (req, res, next) {
    if (req.user.role === "admin") {
      next();
      return;
    } else {
      res.status(401).send(new Error());
    }
  },
};
