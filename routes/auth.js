require("dotenv").config();
var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");

var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

var { isAdmin } = require("../middleware/authMiddleware");

router.post("/register", async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      address,
      telephonenumber,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !address ||
      !telephonenumber
    ) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: "All fields are required" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: { result: error.message },
      });
    }

    const telephoneNumberRegex = /^\d{10}$/;
    if (!telephoneNumberRegex.test(telephonenumber)) {
      return res.status(400).json({
        status: "error",
        statuscode: 400,
        data: {
          result: "Please provide a valid telephone Numbers",
        },
      });
    }

    const existingUser = await userService.findUserByEmailOrUsername(
      email,
      username
    );

    if (existingUser) {
      return res.json({
        status: "error",
        statuscode: 400,
        data: { result: "Email or Username already exists" },
      });
    }

    const newUser = await userService.createUser(
      firstname,
      lastname,
      username,
      email,
      password,
      address,
      telephonenumber
    );

    return res.json({
      status: "success",
      statuscode: 201,
      data: {
        result: "You created an account.",
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      statuscode: 500,
      data: {
        result: "An unexpected error occurred while processing your request.",
      },
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username = "", email = "", password } = req.body;

    if (!username && !email) {
      return res.json({
        status: "error",
        satatuscode: 400,
        data: { result: "Username or email is required" },
      });
    }

    const existingUser = await userService.findUser(
      username || email,
      password
    );

    if (!existingUser) {
      return res.json({
        status: "error",
        status: 401,
        data: {
          result: "Invalid username/email or password",
        },
      });
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, { httpOnly: true });

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      return res.redirect("/admin/products");
    }

    res.json({
      status: "success",
      statuscde: 200,
      data: {
        result: "You are logged in",
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        token: token,
      },
    });
  } catch (error) {
    return res.json({
      status: "error",
      status: "500",
      data: {
        result: error.message,
      },
    });
  }
});

router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "Users found", users },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

router.put("/users", isAdmin, async (req, res) => {
  try {
    const { id, email, firstName, lastName, role } = req.body;

    const user = await userService.updateUser(
      id,
      email,
      firstName,
      lastName,
      role
    );

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "user has been update", user },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

router.get("/roles", isAdmin, async (req, res) => {
  try {
    const roles = await userService.getRoles();

    res.json({
      status: "success",
      statuscode: 200,
      data: { result: "roles found", roles },
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

module.exports = router;
