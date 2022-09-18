import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception, shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// DATABASE in .env file should be mongodb://localhost:27017/<DB>
let database = process.env.DATABASE.replace("<DB>", process.env.NODE_ENV);

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful");
  })
  .catch((err) => {
    console.log("Error connecting to database, shutting down application...");
    process.exit(1);
  });

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection, shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
