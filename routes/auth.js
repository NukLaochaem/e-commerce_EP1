require("dotenv").config();
var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");

var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

var { isAdmin } = require("../middleware/authMiddleware");

router.post("/register", async (req, res, next) => {
  // #swagger.description = "register new users, with unique username, password, as well as a unique email address"
  /* #swagger.parameters['body'] =  { "name": "body","in": "body","schema": {$ref: "#/definitions/register"}}*/
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
      return res.baseJson(400, "All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.baseJson(400, "Please enter a valid email address.");
    }

    const telephoneNumberRegex = /^\d{10}$/;
    if (!telephoneNumberRegex.test(telephonenumber)) {
      return res.baseJson(400, "Please provide a valid telephone number");
    }

    const existingUser = await userService.findUserByEmailOrUsername(
      email,
      username
    );

    if (existingUser) {
      return res.baseJson(400, "Email or Username already exists");
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

    res.baseJson(201, "You created an account.");
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.post("/login", async (req, res, next) => {
  // #swagger.description = "allow registerd users to login"
  /* #swagger.parameters['body'] =  { "name": "body","in": "body","schema": {$ref: "#/definitions/login"}}*/
  try {
    const { username = "", email = "", password } = req.body;

    if (!username && !email) {
      return res.baseJson(400, "Username or email is required");
    }

    const existingUser = await userService.findUser(
      username || email,
      password
    );

    if (!existingUser) {
      return res.baseJson(400, "Invalid username/email or password");
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

    return res.baseJson(200, "You are logged in", {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      token: token,
    });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.get("/users", isAdmin, async (req, res) => {
  // #swagger.description = "Get all users"
  try {
    const users = await userService.getAllUsers();

    res.baseJson(200, "Users found", { users });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.put("/users", isAdmin, async (req, res) => {
  // #swagger.description = "change or update users details"
  try {
    const { id, email, firstName, lastName, role } = req.body;

    if (!id) {
      return res.baseJson(400, "ID is required for updating a user");
    }
    if (!firstName && !lastName && !email && !role) {
      return res.baseJson(
        400,
        "At least one of firstName, lastName, email, or role is required for updating a user"
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.baseJson(400, "Please enter a valid email address.");
    }

    const user = await userService.updateUser(
      id,
      email,
      firstName,
      lastName,
      role
    );
    res.baseJson(200, "User has been update", { user });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.get("/roles", isAdmin, async (req, res) => {
  // #swagger.description = "Get all the roles like User or admin"
  try {
    const roles = await userService.getRoles();

    res.baseJson(200, "roles found", { roles });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

module.exports = router;
