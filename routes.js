import { Router } from "express";
import guestRouter from "./src/main/guests/routes/guestRoutes.js";

const routes = Router();

routes.use("/guests", guestRouter);

export default routes;