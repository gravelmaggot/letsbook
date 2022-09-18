import { Router } from "express";
import { createNewReservation, deleteReservation, getAll, getReservation, getReservationByGuest, updateExistingReservation } from "../controller/reservationController.js";
import {createValidator, idValidator, updateValidator} from "../validator/reservationValidator.js";

const reservationRouter = Router();

reservationRouter.route("/").get(getAll).post(createValidator, createNewReservation);

reservationRouter.route("/:id").get(idValidator, getReservation).patch(updateValidator, updateExistingReservation).delete(idValidator, deleteReservation);

reservationRouter.route("/guest/:id").get(idValidator, getReservationByGuest);

export default reservationRouter;