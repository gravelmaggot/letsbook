import { Router } from "express";
import guestRouter from "./src/main/guests/routes/guestRoutes.js";
import reservationRouter from "./src/main/reservations/routes/reservationRoutes.js";

const routes = Router();

routes.use("/guests", guestRouter);
routes.use("/reservations", reservationRouter);

export default routes;
