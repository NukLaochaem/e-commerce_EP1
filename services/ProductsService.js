class productsService {
  constructor(db) {
    this.client = db.sequelize;
    this.product = db.products;
  }

  async addProduct(name, description, price) {
    return this.product.create({
      name: name,
      description: description,
      price: price,
    });
  }

  async getAllProducts() {
    return this.product.findAll({
      where: {},
    });
  }

  async updateProduct(id, data) {
    return this.product.update(data, { where: { id } });
  }

  async deleteproduct(id) {
    return this.product.destroy({ deletedAt: new Date() }, { where: { id } });
  }
}
module.exports = productsService;
