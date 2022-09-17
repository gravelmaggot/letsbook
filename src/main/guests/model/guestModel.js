import { model, Schema } from "mongoose";

const guestSchema = new Schema({
  name: {
    type: String,
    required: [true, "A guest must have a name."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "A guest must have an e-mail address."],
  },
  birthday: {
    type: Date,
    required: [true, "A guest must have a birthday."],
  },
  phoneNumber: {
    type: String,
    required: [true, "A guest must have a phone number."],
  },
  cpf: {
    type: String,
    required: [true, "A guest must have a CPF."],
  },
  city: {
    type: String,
    required: [true, "A guest must have a city."],
  },
  state: {
    type: String,
    required: [true, "A guest must have a state."],
  },
  country: {
    type: String,
    required: [true, "A guest must have a country."],
  },
});

export default model("Guest", guestSchema);
