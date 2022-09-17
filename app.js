import express from "express";
import routes from "./routes.js";
import AppError from "./src/utils/appError.js";
import errorHandler from "./src/utils/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api", routes);
app.all("*", (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server.`, 404));
});
app.use(errorHandler);

export default app;
