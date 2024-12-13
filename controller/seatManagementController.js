import { Flight } from "../model/flightModel.js";
import { Reservation } from "../model/reservationModel.js";
import { SeatManagementView } from "../view/seatManagementView.js";
import chalk from "chalk";
import inquirer from "inquirer";

export const SeatManagementController = {
  async manageSeats() {
    const flights = Flight.getAll();
    const reservations = Reservation.getAll();

    if (flights.length === 0) {
      SeatManagementView.showErrorMessage("Não há voos cadastrados.");
      return;
    }

    const { flightId } = await inquirer.prompt([
      {
        type: "list",
        name: "flightId",
        message: "Selecione o voo para gerenciar os assentos:",
        choices: flights.map((flight) => ({
          name: `${flight.origin} -> ${flight.destination} (ID: ${flight.id})`,
          value: flight.id,
        })),
      },
    ]);

    const selectedFlight = flights.find((flight) => flight.id === flightId);
    SeatManagementView.showFlightDetails(selectedFlight);

    const flightReservations = reservations.filter(
      (reservation) => reservation.flightId === flightId
    );

    if (flightReservations.length === 0) {
      SeatManagementView.showAllSeatsAvailable();
    } else {
      SeatManagementView.showOccupiedSeats(selectedFlight, flightReservations);
    }

    const action = await SeatManagementView.promptAction();

    if (action === "Liberar um assento") {
      const seatNumber = await SeatManagementView.promptSeatNumber();

      const reservationIndex = reservations.findIndex(
        (reservation) =>
          reservation.flightId === flightId &&
          reservation.seatNumber === seatNumber
      );

      if (reservationIndex === -1) {
        SeatManagementView.showErrorMessage(`O assento ${seatNumber} não está ocupado ou não existe neste voo.`);
        return;
      }

      reservations.splice(reservationIndex, 1);
      Reservation.save(reservations);

      console.log(chalk.green(`O assento ${seatNumber} foi liberado com sucesso!`));
    }
  },
};
