import { celebrate, Segments, Joi } from "celebrate";
import { isValidObjectId } from "mongoose";
import AppError from "../../../utils/appError.js";

const validateObjectId = (id) => {
  if (!isValidObjectId(id)) {
    throw new AppError("Invalid ObjectId", 400);
  }
  return id;
};

export const createValidator = celebrate({
  [Segments.BODY]: {
    hotelName: Joi.string().required(),
    room: Joi.number().required(),
    guestId: Joi.string().custom(validateObjectId).message("blou").required(),
    price: Joi.number().required(),
    reservationDate: Joi.date().required(),
    accommodationDateBegin: Joi.date().required(),
    accommodationDateEnd: Joi.date().required(),
    status: Joi.string()
      .valid("confirmed", "cancelled", "checkIn", "checkOut")
      .required(),
  },
});

export const updateValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(validateObjectId).message("Invalid ObjectId"),
  },
  [Segments.BODY]: {
    hotelName: Joi.string(),
    room: Joi.number(),
    guestId: Joi.string().custom(validateObjectId),
    price: Joi.number(),
    reservationDate: Joi.date(),
    accommodationDateBegin: Joi.date(),
    accommodationDateEnd: Joi.date(),
    status: Joi.string().valid("confirmed", "cancelled", "checkIn", "checkOut"),
  },
});

export const idValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(validateObjectId),
  },
});
