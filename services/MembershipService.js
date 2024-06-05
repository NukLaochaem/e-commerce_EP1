const axios = require("axios");
const crypto = require("crypto");

class MembershipService {
  constructor(db) {
    this.db = db.sequelize;
    this.Membership = db.Membership;
    this.Role = db.Role;
    this.Product = db.Product;
    this.User = db.User;
    this.Category = db.Category;
    this.Brand = db.Brand;
    this.Membership = db.Membership;
  }

  async insertData() {
    try {
      const existingProductsCount = await this.Product.count();
      if (existingProductsCount > 0) {
        console.log("Products already exist in the database.");
        return;
      }

      const response = await axios.get(
        "http://backend.restapi.co.za/items/products"
      );
      const productsData = response.data.data;

      const categories = new Set(
        productsData.map((product) => product.category)
      );
      const brands = new Set(productsData.map((product) => product.brand));

      const createdCategories = await Promise.all(
        [...categories].map((category) =>
          this.Category.create({ name: category })
        )
      );
      const createdBrands = await Promise.all(
        [...brands].map((brand) => this.Brand.create({ name: brand }))
      );

      const products = await Promise.all(
        productsData.map(async (product) => {
          const category = createdCategories.find(
            (category) => category.name === product.category
          );
          const categoryId = category ? category.id : null;

          const brand = createdBrands.find(
            (brand) => brand.name === product.brand
          );
          const brandId = brand ? brand.id : null;

          return this.Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            CategoryId: categoryId,
            BrandId: brandId,
            date_added: product.date_added,
            imgurl: product.imgurl,
            quantity: product.quantity,
          });
        })
      );
      console.log("Data inserted successfully!");
      return products;
    } catch (error) {
      console.error("Error inserting data:", error);
      throw error;
    }
  }

  async populateRolesTable() {
    try {
      const rolesCount = await this.Role.count();
      if (rolesCount === 0) {
        await this.Role.bulkCreate([{ name: "Admin" }, { name: "User" }]);
        return;
      } else {
        return;
      }
    } catch (error) {
      throw new Error("Failed to populate roles table");
    }
  }

  async createAdminUser() {
    const existingAdminUser = await this.User.findOne({
      where: { userName: "Admin" },
    });

    if (existingAdminUser) {
      return "Admin user already exists";
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync("P@ssword2023", salt, 1000, 64, "sha512")
      .toString("hex");

    await this.User.create({
      firstName: "Admin",
      lastName: "Support",
      userName: "Admin",
      email: "admin@noroff.no",
      password: hashedPassword,
      salt: salt,
      address: "Online",
      telephoneNumber: "911",
      RoleId: 1,
      MembershipId: 3,
    });

    return;
  }

  async populateMembershipTable() {
    try {
      const memberships = await this.Membership.findAll();
      if (memberships.length > 0) {
        return;
      }

      await this.Membership.bulkCreate([
        { name: "Bronze", purchaseCount: 0, discount: 0 },
        { name: "Silver", purchaseCount: 15, discount: 0.15 },
        { name: "Gold", purchaseCount: 30, discount: 0.3 },
      ]);

      return;
    } catch (error) {
      throw new error("Failed to populating Membership table");
    }
  }

  async initializeDatabase() {
    try {
      await this.insertData();

      await this.populateRolesTable();

      await this.createAdminUser();

      await this.populateMembershipTable();

      return;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
  async getAllMembership() {
    return this.Membership.findAll();
  }
}

module.exports = MembershipService;
