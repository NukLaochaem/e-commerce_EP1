const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

module.exports = {
  isAuthorized: async function (req, res, next) {
    const token =
      req.cookies.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Login required" },
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        return res.json({
          status: "error",
          statuscode: 401,
          data: { result: "Unauthorized, User not found" },
        });
      }

      req.user = { id: user.id, roleId: user.RoleId };
      next();
    } catch (error) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Invalid token" },
      });
    }
  },

  isAdmin: async function (req, res, next) {
    const token =
      req.cookies.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Login required" },
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findByPk(decoded.userId);

      if (!user || user.RoleId !== 1) {
        return res.json({
          status: "error",
          statuscode: 403,
          data: { result: "Unauthorized User" },
        });
      }

      req.user = { id: user.id, roleId: user.RoleId };
      next();
    } catch (error) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Invalid token" },
      });
    }
  },
};
