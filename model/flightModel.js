import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";
import { FLIGHTS_FILE } from "../config/paths.js";

export const Flight = {
  getAll: () => loadData(FLIGHTS_FILE),

  create: (date, time, origin, destination, planeCode, pilotId, copilotId, tariff) => {
    const flights = Flight.getAll();
    const id = flights.length > 0 ? flights[flights.length - 1].id + 1 : 1;

    const newFlight = {
      id,
      date,
      time,
      origin,
      destination,
      planeCode,
      pilotId,
      copilotId,
      crew: [pilotId, copilotId],
      tariff: parseFloat(tariff),
      status: "Ativo",
    };

    flights.push(newFlight);
    saveData(FLIGHTS_FILE, flights);
  },

  isFlightActive: (flightId) => {
    const flights = Flight.getAll();
    const flight = flights.find((f) => f.id === flightId);
    return flight && flight.status === "Ativo";
  },
};
