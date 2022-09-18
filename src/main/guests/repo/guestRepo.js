import Guest from "../model/guestModel.js";

export async function createGuest(guest) {
  return await Guest.create(guest);
}

export async function findGuestById(id) {
  return await Guest.findById(id);
}

export async function updateGuest(id, guest) {
  return await Guest.findByIdAndUpdate(id, {
    new: true,
    runValidators: true,
  });
}

export async function deleteGuestById(id) {
  return await Guest.findByIdAndDelete(id, {
    runValidators: true,
  });
}
