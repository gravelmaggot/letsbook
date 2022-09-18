import Reservation from "../model/reservationModel.js";

export async function createReservation(reservation) {
  return await Reservation.create(reservation);
}

export async function findReservationById(id) {
  return await Reservation.findById(id);
}

export async function findByGuestId(guestId) {
  return await Reservation.findOne({ guestId });
}

export async function findByDate(dateBegin, dateEnd) {
  return await Reservation.find({
    accommodationDateBegin: { $gte: dateBegin, $lte: dateEnd },
    accommodationDateEnd: { $gte: dateBegin, $lte: dateEnd },
  });
}

export async function updateReservation(id, reservation) {
  return await Reservation.findByIdAndUpdate(id, {
    new: true,
    runValidators: true,
  });
}

export async function deleteReservationById(id) {
  return await Reservation.findByIdAndDelete(id, {
    runValidators: true,
  });
}
