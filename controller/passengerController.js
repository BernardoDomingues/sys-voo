import { Passenger } from "../model/passengerModel.js";
import { PassengerView } from "../view/passengerView.js";

export const PassengerController = {
  async registerPassenger() {
    const { name, address, phone, loyalty } = await PassengerView.promptDetails();
    Passenger.create(name, address, phone, loyalty);
    PassengerView.showSuccessMessage();
  },
};
