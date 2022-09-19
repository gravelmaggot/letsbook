import APIFeatures from "../../../utils/apiFeatures.js";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import Reservation from "../model/reservationModel.js";
import {
  createReservation,
  findReservationById,
  findByGuestId,
  updateReservation,
  deleteReservationById,
  findByDate,
} from "../repo/reservationRepo.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Reservation.find(), req.query)
    .filter()
    .sort()
    .limit()
    .page();
  const reservations = await features.query;

  res.status(200).json({
    status: "Success",
    results: reservations.length,
    data: {
      reservation: reservations,
    },
  });
});

export const getReservation = catchAsync(async (req, res, next) => {
  const reservation = await findReservationById(req.params.id);

  if(!reservation) {
    throw new AppError(`No reservation could be found for id ${req.params.id}.`, 404);
  }


  res.status(200).json({
    status: "Success",
    data: {
      reservation: reservation,
    },
  });
});

export const getReservationByGuest = catchAsync(async (req, res, next) => {
  const reservation = await findByGuestId(req.params.id);

  if(!reservation) {
    throw new AppError(`No reservation could be found for id ${req.params.id}.`, 404);
  }

  res.status(200).json({
    status: "Success",
    data: {
      reservation: reservation,
    },
  });
});

export const createNewReservation = catchAsync(async (req, res, next) => {
  const roomList = await findByDate(
    req.body.accommodationDateBegin,
    req.body.accommodationDateEnd
  );
  const reservedRoom = roomList.filter(
    (reservation) =>
      reservation.room === req.body.room &&
      reservation.hotelName === req.body.hotelName
  );
  if (reservedRoom.length != 0) {
    throw new AppError(`Room ${req.body.room} is already reserved.`, 422);
  }

  const newReservation = await createReservation(req.body);

  res.status(200).json({
    status: "Success",
    data: {
      reservation: newReservation,
    },
  });
});

export const updateExistingReservation = catchAsync(async (req, res, next) => {
  const roomList = await findByDate(
    req.body.accommodationDateBegin,
    req.body.accommodationDateEnd
  );
  const reservedRoom = roomList.filter(
    (reservation) =>
      reservation.room === req.body.room &&
      reservation.hotelName === req.body.hotelName
  );
  if (reservedRoom.length != 0) {
    throw new AppError(`Room ${req.body.room} is already reserved.`, 422);
  }

  const updatedReservation = await updateReservation(req.params.id, req.body);

  if (!updatedReservation) {
    throw new AppError(`No reservation could be found for id ${req.params.id}.`, 404);
  }

  res.status(200).json({
    status: "Success",
    data: {
      reservation: updatedReservation,
    },
  });
});

export const deleteReservation = catchAsync(async (req, res, next) => {
  const reservation = await deleteReservationById(req.params.id);

  if (!reservation) {
    throw new AppError(`No reservation could be found for id ${req.params.id}.`, 404);
  }

  res.status(204).json({
    status: "Success",
  });
});
