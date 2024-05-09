const axios = require("axios");
const crypto = require("crypto");

class MembershipService {
  constructor(db) {
    this.db = db.sequelize;
    this.Membership = db.Membership;
    this.Role = db.Role;
    this.Product = db.Product;
    this.User = db.User;
  }

  async dataFromAPI() {
    try {
      const existingProductsCount = await this.Product.count();
      if (existingProductsCount > 0) {
        console.log("Products already exist in the database.");
        return;
      }

      const response = await axios.get(
        "http://backend.restapi.co.za/items/products"
      );
      const products = response.data.data;
      console.log(products);

      await this.Product.bulkCreate(products);

      return;
    } catch (error) {
      throw new Error("Failed to fetch initial data from API");
    }
  }

  async populateRolesTable() {
    try {
      const rolesCount = await this.Role.count();
      if (rolesCount === 0) {
        await this.Role.bulkCreate([{ name: "Admin" }, { name: "User" }]);
        return "Roles have been created";
      } else {
        return;
      }
    } catch (error) {
      throw new Error("Failed to populate roles table");
    }
  }

  async createAdminUser() {
    const adminRole = await this.Role.findOne({ where: { name: "Admin" } });

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
      role: adminRole.name,
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

      return "Membership table populated successfully";
    } catch (error) {
      throw new error("Failed to populating Membership table");
    }
  }

  async initializeDatabase() {
    try {
      await this.dataFromAPI();

      await this.populateRolesTable();

      await this.createAdminUser();

      await this.populateMembershipTable();

      return;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}

module.exports = MembershipService;
