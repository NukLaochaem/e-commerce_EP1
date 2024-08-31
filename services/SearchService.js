const { QueryTypes } = require("sequelize");

class SearchService {
  constructor(db) {
    this.db = db.sequelize;
  }

  async searchProducts({ productName, categoryName, brandName }) {
    let query = `
      SELECT p.*, b.name AS brandName, c.name AS categoryName
      FROM Products p
      LEFT JOIN Brands b ON p.brandId = b.id
      LEFT JOIN Categories c ON p.categoryId = c.id
      WHERE 1=1 
    `;

    const replacements = {};

    if (productName) {
      query += "AND p.name LIKE :productName ";
      replacements.productName = `%${productName}%`;
    }

    if (categoryName) {
      query += "AND c.name = :categoryName ";
      replacements.categoryName = categoryName;
    }

    if (brandName) {
      query += "AND b.name = :brandName ";
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
