import { Flight } from "../model/flightModel.js";
import { Crew } from "../model/crewModel.js";
import { FlightView } from "../view/flightView.js";

export const FlightController = {
  async registerFlight() {
    const crew = Crew.getAll();

    const pilots = crew.filter((member) => member.role === "Piloto");
    const copilots = crew.filter((member) => member.role === "Copiloto");

    if (pilots.length === 0 || copilots.length === 0) {
      FlightView.showErrorMessage();
      return;
    }

    const pilotChoices = pilots.map((member) => ({
      name: `${member.name} (ID: ${member.id})`,
      value: member.id,
    }));

    const copilotChoices = copilots.map((member) => ({
      name: `${member.name} (ID: ${member.id})`,
      value: member.id,
    }));

    const flightDetails = await FlightView.promptDetails(pilotChoices, copilotChoices);

    Flight.create(
      flightDetails.date,
      flightDetails.time,
      flightDetails.origin,
      flightDetails.destination,
      flightDetails.planeCode,
      flightDetails.pilotId,
      flightDetails.copilotId,
      flightDetails.tariff
    );

    FlightView.showSuccessMessage();
  },
};
