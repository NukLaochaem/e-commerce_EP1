class BrandsService {
  constructor(db) {
    this.db = db.sequelize;
    this.Brand = db.Brand;
  }

  async create(name) {
    return this.Brand.create({
      name: name,
    });
  }

  async getAll() {
    return this.Brand.findAll({
      where: {},
    });
  }

  async update(brandsId, name) {
    return this.Brand.update({ name }, { where: { id: brandsId } });
  }

  async deletebrands(brandsId) {
    return this.Brand.destroy({
      where: { id: brandsId },
    });
  }
}
module.exports = BrandsService;
