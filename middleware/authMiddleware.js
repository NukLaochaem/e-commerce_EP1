module.exports = {
  checkIfAuthorized: function (req, res, next) {
    if (!req.user) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Login required" },
      });
    }
    if (req.user.role === "User") {
      next();
    } else {
      return res.json({
        status: "error",
        statuscode: 403,
        data: { result: "Unauthorized" },
      });
    }
  },

  isAdmin: function (req, res, next) {
    if (!req.user) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Login required" },
      });
    }
    if (req.user.role === "Admin") {
      next();
    } else {
      return res.json({
        status: "error",
        statuscode: 403,
        data: { result: "Unauthorized" },
      });
    }
  },
};
