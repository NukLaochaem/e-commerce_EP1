class CategoriesService {
  constructor(db) {
    this.db = db.sequelize;
    this.Category = db.Category;
  }

  async create(name, description) {
    return this.Category.create({
      name,
      description,
    });
  }

  async getAll() {
    return this.Category.findAll();
  }

  async update(categoryId, newData) {
    return this.Category.update(newData, { where: { id: categoryId } });
  }

  async delete(categoryId) {
    return this.Category.destroy({ where: { id: categoryId } });
  }
}

module.exports = CategoriesService;
