import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";
import { RESERVATIONS_FILE } from "../config/paths.js";

export const Reservation = {
  getAll: () => loadData(RESERVATIONS_FILE),

  create: (flightId, passengerId, seatNumber) => {
    const reservations = Reservation.getAll();
    const id = reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1;

    const newReservation = { id, flightId, passengerId, seatNumber };
    reservations.push(newReservation);
    saveData(RESERVATIONS_FILE, reservations);
  },

  isSeatTaken: (flightId, seatNumber) => {
    const reservations = Reservation.getAll();
    return reservations.some(
      (reservation) =>
        reservation.flightId === flightId && reservation.seatNumber === seatNumber
    );
  },

  save(data) {
    saveData(RESERVATIONS_FILE, data);
  },
};
