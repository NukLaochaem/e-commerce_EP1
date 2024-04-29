class brandsService {
  constructor(db) {
    this.client = db.sequelize;
    this.brand = db.brands;
  }

  async create(name) {
    return this.brand.create({
      name: name,
    });
  }

  async getAll() {
    return this.brand.findAll({
      where: {},
    });
  }

  async update(brandsId, name) {
    return this.brand.update({ name }, { where: { id: brandsId } });
  }

  async deletebrands(brandsId) {
    return this.brand.destroy({
      where: { id: brandsId },
    });
  }
}
module.exports = brandsService;
