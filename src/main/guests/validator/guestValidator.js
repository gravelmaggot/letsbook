import { celebrate, Segments, Joi } from "celebrate";
import { isValidObjectId } from "mongoose";

const validateObjectId = (id) => {
  if (!isValidObjectId(id)) {
    throw new AppError("Invalid ObjectId", 400);
  }
  return id;
};

export const createValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().max(100).required(),
    email: Joi.string().email().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
    phoneNumber: Joi.string().regex(/([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})/).required(),
    birthday: Joi.date().required(),
    city: Joi.string().max(40).required(),
    state: Joi.string().max(2).required(),
    country: Joi.string().max(40).required(),
  },
});

export const updateValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(validateObjectId).message("Invalid Guest Id"),
  },
  [Segments.BODY]: {
    name: Joi.string().max(100),
    email: Joi.string().email().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    phoneNumber: Joi.string().regex(/([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})/),
    birthday: Joi.date(),
    city: Joi.string().max(40),
    state: Joi.string().max(2),
    country: Joi.string().max(40),
  },
});

export const idValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().custom(validateObjectId),
  },
});
