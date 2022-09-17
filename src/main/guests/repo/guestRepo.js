import Guest from "../model/guestModel.js";

export async function createGuest(guest) {
  await Guest.create(guest);
}

export async function findAllGuests() {
  return await Guest.find();
}

export async function findGuestByCpf(cpf) {
  return await Guest.findOne({ cpf: cpf });
}

export async function findGuestById(id) {
  return await Guest.findById(id);
}

export async function updateGuest(id, guest) {
  return await Guest.findByIdAndUpdate(id, guest, {
    new: true,
    runValidators: true,
  });
}

export async function deleteGuestById(id) {
  await Guest.findByIdAndDelete(id, {
    runValidators: true,
  });
}
