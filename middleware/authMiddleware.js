const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

module.exports = {
  isAuthorized: async function (req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.json({
        status: "error",
        statuscode: 401,
        data: { result: "Login required" },
      });
    }

    const token = authHeader.split(" ")[1];

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
      return res.status(401).json({
        status: "error",
        statuscode: 401,
        data: { result: "Invalid token" },
      });
    }
  },

  isAdmin: async function (req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        statuscode: 401,
        data: { result: "Login required" },
      });
    }
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findByPk(decoded.userId);

      if (user.RoleId !== 1) {
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
