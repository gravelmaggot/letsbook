import { Router } from "express";
import { getAll, getGuest, createNewGuest, updateExistingGuest, deleteGuest } from "../controller/guestController.js";

const guestRouter = Router();

guestRouter.route('/').get(getAll).post(createNewGuest);

guestRouter.route('/:id').get(getGuest).patch(updateExistingGuest).delete(deleteGuest);

export default guestRouter;