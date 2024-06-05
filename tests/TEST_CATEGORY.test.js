const express = require("express");
const serverRoutes = require("./routes");
const request = require("supertest");

describe("testing-server-routes", () => {
  test("GET /countries - success", async () => {
    const { body } = await request(app).get("/countries");
    expect(body).toEqual([
      {
        short: "EN",
        name: "England",
        capital: "London",
      },
    ]);
  });
});
