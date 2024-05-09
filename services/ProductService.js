class ProductsService {
  constructor(db) {
    this.db = db.sequelize;
    this.Product = db.Product;
  }

  async addProduct(name, description, price) {
    return this.Product.create({
      name: name,
      description: description,
      price: price,
    });
  }

  async getAllProducts() {
    const query = `SELECT * FROM products`;
    return this.Product.sequelize.query(query, {
      type: this.Product.sequelize.QueryTypes.SELECT,
    });
  }

  async updateProduct(id, data) {
    return this.Product.update(data, { where: { id } });
  }

  async deleteproduct(id) {
    return this.Product.destroy({ deletedAt: new Date() }, { where: { id } });
  }
}
module.exports = ProductsService;
