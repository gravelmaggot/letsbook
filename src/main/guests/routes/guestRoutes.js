import { Router } from "express";
import { getAll, getGuest, createNewGuest, updateExistingGuest, deleteGuest } from "../controller/guestController.js";
import {createValidator, idValidator, updateValidator} from "../validator/guestValidator.js";

const guestRouter = Router();

guestRouter.route("/").get(getAll).post(createValidator, createNewGuest);

guestRouter.route("/:id").get(idValidator,getGuest).patch(updateValidator, updateExistingGuest).delete(idValidator, deleteGuest);

export default guestRouter;