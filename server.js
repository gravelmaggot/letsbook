import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config({ path: './config.env' })

const database = process.env.NODE_ENV === "production" ? "mongodb://localhost:27017/prod" : "mongodb://localhost:27017/dev"

mongoose
    .connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connection Successful");
    });

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});