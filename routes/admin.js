var express = require("express");
var router = express.Router();

var { isAdmin } = require("../middleware/authMiddleware");
var axios = require("axios");

//To show / edit all products
router.get("/products", isAdmin, async (req, res, next) => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    const products = response.data.data.products;

    res.render("layout", {
      title: "All Products",
      body: "pages/products",
      products: products,
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

router.get("/brands", isAdmin, async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/brands");
    const brands = response.data.data.brands;

    res.render("layout", {
      title: "Brands",
      body: "pages/brands",
      brands: brands,
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

router.get("/categories", isAdmin, async (req, res) => {
  const response = await axios.get("http://localhost:3000/categories");
  const categories = response.data.data.categories;

  try {
    res.render("layout", {
      title: "Categories",
      body: "pages/categories",
      categories: categories,
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

router.get("/roles", isAdmin, async (req, res, next) => {
  const response = await axios.get("http://localhost:3000/auth/roles", {
    headers: {
      Authorization: `Bearer ${req.cookies.token}`,
    },
  });

  const roles = response.data.data.roles;
  console.log(response.data.data);

  try {
    res.render("layout", {
      title: "Roles",
      body: "pages/roles",
      roles: roles,
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

//Admin users can change registered/signed-up user roles to admin from the back-end user interface.
router.get("/users", isAdmin, async (req, res, next) => {
  const response = await axios.get("http://localhost:3000/auth/users", {
    headers: {
      Authorization: `Bearer ${req.cookies.token}`,
    },
  });

  const users = response.data.data.users;

  try {
    res.render("layout", {
      title: "Users",
      body: "pages/users",
      users: users,
    });
  } catch (error) {
    res.json({
      status: "error",
      statuscode: 500,
      data: { result: error.message },
    });
  }
});

// change order status
router.get("/orders", isAdmin, async (req, res, next) => {
  const response = await axios.get("http://localhost:3000/orders", {
    headers: {
      Authorization: `Bearer ${req.cookies.token}`,
    },
  });
  const orders = response.data.data.orders;

  try {
    res.render("layout", {
      title: "Orders",
      body: "pages/orders",
      orders: orders,
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
