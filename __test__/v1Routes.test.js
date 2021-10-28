"use strict";

const { db } = require("../src/modelinstance/index.js");
const supertest = require("supertest");
const server = require("../src/server.js");
const { expect } = require("@jest/globals");
const request = supertest(server.server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("Testing authentication routes", () => {
  it("Should be able to add an item to the DB and returns an object with the added item using POST /api/v1/:mode", async () => {
    const response = await request.post("/api/v1/food").send({
      name: "orange",
      calories: 140,
      type: "fruit",
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual("orange");
  });

  it("Should be able to returns a list of :model items using GET /api/v1/:model", async () => {
    const response = await request.get("/api/v1/food");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  it("Should be able to returns single item by ID using GET /api/v2/:model/ID", async () => {
    const response = await request.get("/api/v1/food/1");
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("orange");
  });

  it("Should be able to update single item by ID using PUT /api/v1/:model/ID", async () => {
    const response = await request.put("/api/v1/food/1").send({
      name: "watermelon",
      calories: 4000,
      type: "vegetable",
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("watermelon");
  });

  it("Should be able to delete single item by ID using DELETE /api/v1/:model/ID and test with GET to get null in response", async () => {
    const responseDel = await request.delete("/api/v1/food/1");
    expect(responseDel.body).toBe(1);

    const response = await request.get("/api/v1/food/1");
    expect(response.status).toEqual(200);
    console.log("------------------>", responseDel.body);
    expect(response.body === null).toBe(true);
  });
});
