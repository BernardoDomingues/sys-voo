import chalk from "chalk";
import inquirer from "inquirer";

export const SeatManagementView = {
  showErrorMessage(message) {
    console.log(chalk.red(message));
  },

  showAllSeatsAvailable() {
    console.log(chalk.yellow("Todos os assentos estão livres neste voo."));
  },

  showOccupiedSeats(flight, reservations) {
    console.log(chalk.blue(`Assentos ocupados no voo ${flight.origin} -> ${flight.destination}:`));
    reservations.forEach((seat) =>
      console.log(`Assento ${seat.seatNumber}: Ocupado (Passageiro ID: ${seat.passengerId})`)
    );
  },

  showFlightDetails(flight) {
    console.log(chalk.blue(`Gerenciando assentos do voo: ${flight.origin} -> ${flight.destination}`));
    console.log(`Data: ${flight.date}, Hora: ${flight.time}`);
    console.log(`Avião: ${flight.planeCode}, Status: ${flight.status}\n`);
  },

  async promptAction() {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "O que você gostaria de fazer?",
        choices: ["Liberar um assento", "Voltar"],
      },
    ]);
    return action;
  },

  async promptSeatNumber() {
    const { seatNumber } = await inquirer.prompt([
      {
        type: "input",
        name: "seatNumber",
        message: "Informe o número do assento a ser liberado:",
      },
    ]);
    return seatNumber;
  },
};
