var express = require("express");
var router = express.Router();

var { isAdmin } = require("../middleware/authMiddleware");
var axios = require("axios");

router.get("/products", isAdmin, async (req, res, next) => {
  // #swagger.description = "get products and render be display"
  try {
    const response = await axios.get("http://localhost:3000/products");
    const products = response.data.data.products;

    res.render("layout", {
      title: "All Products",
      body: "pages/products",
      products: products,
    });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.get("/brands", isAdmin, async (req, res) => {
  // #swagger.description = "Get brands and render be display"
  try {
    const response = await axios.get("http://localhost:3000/brands");
    const brands = response.data.data.brands;

    res.render("layout", {
      title: "Brands",
      body: "pages/brands",
      brands: brands,
    });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.get("/categories", isAdmin, async (req, res) => {
  // #swagger.description = "Get categories and render be display"
  const response = await axios.get("http://localhost:3000/categories");
  const categories = response.data.data.categories;

  try {
    res.render("layout", {
      title: "Categories",
      body: "pages/categories",
      categories: categories,
    });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.get("/roles", isAdmin, async (req, res, next) => {
  // #swagger.description = "Get roles and render to display"
  const response = await axios.get("http://localhost:3000/auth/roles", {
    headers: {
      Authorization: `Bearer ${req.cookies.token}`,
    },
  });

  const roles = response.data.data.roles;

  try {
    res.render("layout", {
      title: "Roles",
      body: "pages/roles",
      roles: roles,
    });
  } catch (error) {
    res.baseJson(500, error.message);
  }
});

router.get("/users", isAdmin, async (req, res, next) => {
  // #swagger.description = "get users and render all to display"
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
    res.baseJson(500, error.message);
  }
});

router.get("/orders", isAdmin, async (req, res, next) => {
  // #swagger.description = "get orders and render to display"
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
    res.baseJson(500, error.message);
  }
});

module.exports = router;
