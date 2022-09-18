import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { describe, expect, it, afterAll, beforeAll } from "@jest/globals";
import app from "../../app.js";

let testReservation = null;

const mockReservation = {
  hotelName: "Serra Azul",
  room: 202,
  guestId: "6326923ba7b4a3d0f02beb49",
  price: 142.25,
  accommodationDateBegin: "2022-09-20",
  accommodationDateEnd: "2022-09-20",
  status: "confirmed",
}

const secondMockReservation = {
  hotelName: "Serra Azul",
  room: 202,
  guestId: "6326923ba7b4a3d0f02beb49",
  price: 142.25,
  accommodationDateBegin: "2022-09-20",
  accommodationDateEnd: "2022-09-20",
  status: "confirmed",
}

const updatedMockReservation = {
  hotelName: "Serra Azul",
  room: 204,
  guestId: "6326923ba7b4a3d0f02beb49",
  price: 142.25,
  accommodationDateBegin: "2022-09-20",
  accommodationDateEnd: "2022-09-20",
  status: "confirmed",
}

describe("Reservations", () => {
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
  
  it("should create new reservation", async () => {
    const response = await request(app).post("api/reservations").send(mockReservation);

    testReservation = response.body.data.reservation;

    expect(response.status).toBe(202);
  });

  it("should not create new reservation", async () => {
    const response = await request(app).post("api/reservations").send(secondMockReservation);

    expect(response.status).toBe(422);
  });

  it("should find all reservations", async () => {
    const response = await request(app).get("api/reservations");

    expect(response.status).toBe(200);
  });

  it("should find reservation by id", async () => {
    const response = await request(app).get(`api/reservations/${testReservation._id}`);

    expect(response.status).toBe(200);
  });

  it("should not find reservation by id", async () => {
    const response = await request(app).get("api/reservations/6326a3fe6e14f07cda5831e2");

    expect(response.status).toBe(404);
  });

  it("should find reservation by guest id", async () => {
    const response = await request(app).get("api/reservations/guest/6326923ba7b4a3d0f02beb49");

    expect(response.status).toBe(200);
  });

  it("should not find reservation by guest id", async () => {
    const response = await request(app).get("api/reservations/guest/6326923ba7b4a3d0f02beb48");

    expect(response.status).toBe(404);
  });

  it("should update reservation", async () => {
    const response = await request(app).post(`api/reservations/${testReservation._id}`).send(updatedMockReservation);

    expect(response.status).toBe(200);
  });

  it("should not update reservation - room not vacant", async () => {
    const response = await request(app).patch(`api/reservations/${testReservation._id}`).send(secondMockReservation);

    expect(response.status).toBe(422);
  });

  it("should not update reservation - invalid id", async () => {
    const response = await request(app).patch("api/reservations/6326a3fe6e14f07cda5831e2").send(secondMockReservation);

    expect(response.status).toBe(404);
  });

  it("should delete reservation", async () => {
    const response = await request(app).delete(`api/reservations/${testReservation._id}`);

    expect(response.status).toBe(204);
  });

  it("should not delete reservation", async () => {
    const response = await request(app).delete("api/reservations/6326a3fe6e14f07cda5831e2");

    expect(response.status).toBe(404);
  });

  it("bad request", async () => {
    const response = await request(app).get("/api/reservations/aaaaaaaa");

    expect(response.status).toBe(400);
  });
});
