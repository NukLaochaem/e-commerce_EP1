const { QueryTypes } = require("sequelize");

class SearchService {
  constructor(db) {
    this.db = db.sequelize;
  }

  async searchProducts({ productName, categoryName, brandName }) {
    let query = "SELECT * FROM Products WHERE 1=1 ";

    const replacements = {};

    if (productName) {
      query += "AND name LIKE :productName ";
      replacements.productName = `%${productName}%`;
    }

    if (categoryName) {
      query +=
        "AND categoryId IN (SELECT id FROM Categories WHERE name = :categoryName) ";
      replacements.categoryName = categoryName;
    }

    if (brandName) {
      query +=
        "AND brandId IN (SELECT id FROM Brands WHERE name = :brandName) ";
      replacements.brandName = brandName;
    }

    const products = await this.db.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return products;
  }
}

module.exports = SearchService;
