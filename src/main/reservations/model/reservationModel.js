import { model, Schema } from "mongoose";

const reservationSchema = new Schema({
  hotelName: {
    type: String,
    required: [true, "A reservation must have a hotel name."],
  },
  room: {
    type: Number,
    required: [true, "A reservation must have a hotel room number."],
  },
  price: {
    type: Number,
    required: [true, "A reservation must have a price."],
  },
  reservationDate: {
    type: Date,
    required: [true, "A reservation must have a date."],
  },
  accommodationDateBegin: {
    type: Date,
    required: [
      true, "A reservation must have a beginning date for a guest's accommodation.",
    ],
  },
  accommodationDateEnd: {
    type: Date,
    required: [
      true, "A reservation must have a date for the end of a guest's accommodation",
    ],
  },
  status: {
    type: String,
    required: [true, "A reservation must have a status."],
    enum: {
      values: ["confirmed", "cancelled", "checkIn", "checkOut"],
      message: "Status must be one of: confirmed, cancelled, checkIn or checkOut.",
    },
  },
});

export default model("Reservation", reservationSchema);
