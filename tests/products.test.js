const request = require("supertest");
const app = require("../app");

let authToken;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post("/auth/login")
    .send({ username: "admin", password: "P@ssword2023" });

  authToken = loginResponse.body.data.token;
});

describe("Products API", () => {
  let testProductId;

  it("should create a new product", async () => {
    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "TEST_CATEGORY" });

    const testCategoryId = categoryResponse.body.data.category.id;

    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "TEST_PRODUCT",
        description: "Test description",
        price: 100,
        quantity: 10,
        brand: 1,
        category: testCategoryId,
      });

    testProductId = response.body.data.product.id;
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.product.name).toBe("TEST_PRODUCT");
  });

  it("should return a list of products", async () => {
    const response = await request(app).get("/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data.products)).toBe(true);
  });

  it("should update a product", async () => {
    const response = await request(app)
      .put(`/products/${testProductId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Updated Test Product",
        description: "Updated Test Description",
        price: 150,
        quantity: 20,
        brandId: 2,
        categoryId: 2,
        imgurl: "http://example.com/updated-image.jpg",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.updatedProduct.name).toBe("Updated Test Product");
  });

  it("should delete a product", async () => {
    const response = await request(app)
      .delete(`/products/${testProductId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});
