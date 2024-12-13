import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";
import { PASSENGERS_FILE } from "../config/paths.js";

export const Passenger = {
  getAll: () => loadData(PASSENGERS_FILE),

  create: (name, address, phone, loyalty) => {
    const passengers = Passenger.getAll();
    const id = passengers.length > 0 ? passengers[passengers.length - 1].id + 1 : 1;
    const newPassenger = {
      id,
      name,
      address,
      phone,
      loyalty,
      loyaltyPoints: 0,
    };

    passengers.push(newPassenger);
    saveData(PASSENGERS_FILE, passengers);
  },
};
