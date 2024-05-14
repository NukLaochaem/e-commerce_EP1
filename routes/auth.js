require("dotenv").config();
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var passport = require("passport");
var LocalStrategy = require("passport-local");
var jwt = require("jsonwebtoken");

var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

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
        data: { result: "Invalid email format" },
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
        result: "An unexpected error occurred while processing your request.",
      },
    });
  }
});

module.exports = router;
