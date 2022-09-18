import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { describe, expect, it, afterAll, beforeAll } from "@jest/globals";
import app from "../../app.js";

const mockGuest = {
  name: "Kiryu Kazuma",
  email: "judgementkazzy@gmail.com",
  birthday: "1968-06-17T00:00:00.000Z",
  phoneNumber: "54999327917",
  city: "Gramado",
  state: "RS",
  country: "Brasil",
};

const updatedMockGuest = {
  name: "Majima Goro",
  email: "eyepatch@hotmail.com",
  birthday: "1964-05-14T00:00:00.000Z",
  phoneNumber: "54999327918",
  city: "Gramado",
  state: "RS",
  country: "Brasil",
};

describe("Guests", () => {
  let mongod = null;
  beforeAll(async () => {
    try {
      mongod = await MongoMemoryServer.create({debug : true});
      const db = mongod.getUri();

      mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("Test database connected.");
    } catch {
      console.log("Something went wrong, killing process.");
      process.exit(1);
    }
  });
  afterAll(async () => {
    try {
      await mongod.stop();
      console.log("DB disconnected.");
    } catch {
      console.log("Something went wrong, killing process.");
      process.exit(1);
    }
  });

  let testGuest = null;

  it("should save new guest", async () => {
    const response = await request(app).post("/api/guests").send(mockGuest);
    testGuest = response.body.data.guest;

    expect(response.status).toBe(201);
  });

  it("should not be able to create same guest twice", async () => {
    const response = await request(app).post("/api/guests").send(mockGuest);

    expect(response.status).toBe(400);
  });

  it("should list all guests", async () => {
    const response = await request(app).get("/api/guests");

    expect(response.status).toBe(200);
  });

  it("should be able to find guest by id", async () => {
    const response = await request(app).get(`/api/guests/${testGuest._id}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to find guest by id", async () => {
    const response = await request(app).get(
      "/api/guests/6326923ba7b4a3d0f02beb49"
    );

    expect(response.status).toBe(404);
  });

  it("should update guest", async () => {
    const response = await request(app).patch(`/api/guests/${testGuest._id}`).send(updatedMockGuest);

    expect(response.status).toBe(200);
  });

  it("should not be able to update guest", async () => {
    const response = await request(app).patch("/api/guests/6326923ba7b4a3d0f02beb49").send(updatedMockGuest);

    expect(response.status).toBe(404);
  });

  it("should be able to delete guest", async () => {
    const response = await request(app).delete(`/api/guests/${testGuest._id}`);

    expect(response.status).toBe(204);
  });

  it("should not be able to delete guest", async () => {
    const response = await request(app).patch("/api/guests/6326923ba7b4a3d0f02beb49");

    expect(response.status).toBe(404);
  });

  it("bad request", async () => {
    const response = await request(app).get("/api/guests/aaaaaaaa");

    expect(response.status).toBe(400);
  });
});
