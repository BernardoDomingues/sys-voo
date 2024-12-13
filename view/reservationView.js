import inquirer from "inquirer";
import chalk from "chalk";

export const ReservationView = {
  showError(message) {
    console.log(chalk.red(message));
  },

  showSuccess(message) {
    console.log(chalk.green(message));
  },

  async promptReservationDetails(flights, passengers) {
    const flightChoices = flights
      .filter((flight) => flight.status === "Ativo")
      .map((flight) => ({
        name: `${flight.origin} -> ${flight.destination} (ID: ${flight.id})`,
        value: flight.id,
      }));

    const passengerChoices = passengers.map((passenger) => ({
      name: `${passenger.name} (ID: ${passenger.id})`,
      value: passenger.id,
    }));

    return await inquirer.prompt([
      {
        type: "list",
        name: "flightId",
        message: "Selecione o voo:",
        choices: flightChoices,
      },
      {
        type: "list",
        name: "passengerId",
        message: "Selecione o passageiro:",
        choices: passengerChoices,
      },
      {
        type: "input",
        name: "seatNumber",
        message: "Número do assento:",
      },
    ]);
  },
};
