import APIFeatures from "../../../utils/apiFeatures.js";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import Guest from "../model/guestModel.js";
import {
  createGuest,
  findGuestById,
  updateGuest,
  deleteGuestById,
} from "../repo/guestRepo.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Guest.find(), req.query)
    .filter()
    .sort()
    .limit()
    .page();
  const guests = await features.query;

  res.status(200).json({
    status: "Success",
    results: guests.length,
    data: {
      guest: guests,
    },
  });
});

export const getGuest = catchAsync(async (req, res, next) => {
  const guest = await findGuestById(req.params.id);

  if(!guest) {
    throw new AppError(`No guest could be found for id ${req.params.id}.`, 404);
  }

  res.status(200).json({
    status: "Success",
    data: {
      guest: guest,
    },
  });
});

export const createNewGuest = catchAsync(async (req, res, next) => {
  const newGuest = await createGuest(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      guest: newGuest,
    },
  });
});

export const updateExistingGuest = catchAsync(async (req, res, next) => {
  const updatedGuest = await updateGuest(req.params.id, req.body);

  if (!updatedGuest) {
    throw new AppError(`No guest could be found for id ${req.params.id}.`, 404);
  }

  res.status(200).json({
    status: "Success",
    data: {
      guest: updatedGuest,
    },
  });
});

export const deleteGuest = catchAsync(async (req, res, next) => {
  const guest = await deleteGuestById(req.params.id);

  if (!guest) {
    return next(new AppError(`No guest could be found for id ${req.params.id}.`, 404));
  }

  res.status(204).json({
    status: "Success",
  });;
});
