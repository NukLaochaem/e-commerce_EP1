class CategoriesService {
  constructor(db) {
    this.db = db.sequelize;
    this.Category = db.Category;
  }

  async getAllCategories() {
    return this.Category.findAll();
  }

  async createCategory(name) {
    return this.Category.create({ name });
  }

  async getCategoryById(id) {
    return this.Category.findByPk(id);
  }

  async updateCategory(id, newData) {
    const category = await this.Category.findByPk(id);
    return category.update(newData);
  }

  async deleteCategory(id) {
    const category = await this.Category.findByPk(id);

    if (category) {
      const products = await category.getProducts();

      if (products.length > 0) {
        throw new Error(
          "Category is assigned to products and cannot be deleted"
        );
      }
      return category.destroy();
    }
    return null;
  }
}

module.exports = CategoriesService;
