class ProductsService {
  constructor(db) {
    this.db = db.sequelize;
    this.Product = db.Product;
  }

  async getAllProducts() {
    const query = `
    SELECT 
        p.*, 
        b.name AS brand,
        c.name AS category
    FROM 
        products p
        INNER JOIN categories c ON p.CategoryId = c.id
        INNER JOIN brands b ON p.BrandId = b.id
    `;

    return this.Product.sequelize.query(query, {
      type: this.Product.sequelize.QueryTypes.SELECT,
    });
  }

  async addProduct(
    name,
    description,
    price,
    quantity,
    brandId,
    categoryId,
    imgurl
  ) {
    const product = await this.Product.create({
      name,
      description,
      price,
      quantity,
      BrandId: brandId,
      CategoryId: categoryId,
      imgurl: imgurl,
    });

    return product;
  }

  async getProductById(id) {
    return this.Product.findByPk(id);
  }

  async updateProduct(productId, updateData) {
    const product = await this.Product.findByPk(productId);

    Object.assign(product, updateData);

    await product.save();

    return product;
  }

  async deleteProduct(id) {
    const product = await this.Product.findByPk(id);

    return product.destroy();
  }
}
module.exports = ProductsService;
