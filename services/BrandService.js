class BrandsService {
  constructor(db) {
    this.db = db.sequelize;
    this.Brand = db.Brand;
  }
  async getAllBrand() {
    return this.Brand.findAll();
  }

  async createBrand(name) {
    return this.Brand.create({ name });
  }

  async getBrandById(id) {
    return this.Brand.findByPk(id);
  }

  async updateBrand(id, newData) {
    const brand = await this.Brand.findByPk(id);
    return brand.update(newData);
  }

  async deleteBrand(id) {
    const brand = await this.Brand.findByPk(id);

    if (brand) {
      const products = await brand.getProducts();

      if (products.length > 0) {
        throw new Error("Brand is assigned to products and cannot be deleted");
      }
      return brand.destroy();
    }
    return null;
  }
}
module.exports = BrandsService;
