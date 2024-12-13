import { LoyaltyProgramView } from "../view/loyaltyProgramView.js";
import { Passenger } from "../model/passengerModel.js";

export const LoyaltyProgramController = {
  async viewLoyaltyProgram() {
    const passengers = Passenger.getAll();

    if (passengers.length === 0) {
      LoyaltyProgramView.showErrorMessage("Não há passageiros cadastrados.");
      return;
    }

    const searchOption = await LoyaltyProgramView.promptSearchOption();

    let passenger;
    if (searchOption === "Nome") {
      const name = await LoyaltyProgramView.promptSearchByName();
      passenger = passengers.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );
    } else if (searchOption === "ID") {
      const id = await LoyaltyProgramView.promptSearchById();
      passenger = passengers.find((p) => p.id === id);
    }

    if (!passenger) {
      LoyaltyProgramView.showErrorMessage("Passageiro não encontrado.");
      return;
    }

    LoyaltyProgramView.showPassengerDetails(passenger);
  },
};
