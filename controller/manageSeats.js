import chalk from "chalk";
import inquirer from "inquirer";

import { FLIGHTS_FILE, RESERVATIONS_FILE } from "../config/paths.js";
import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";

export const manageSeats = async () => {
  const flights = loadData(FLIGHTS_FILE);
  const reservations = loadData(RESERVATIONS_FILE);

  if (flights.length === 0) {
    console.log(chalk.red("Não há voos cadastrados."));
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

  console.log(
    chalk.blue(
      `Gerenciando assentos do voo: ${selectedFlight.origin} -> ${selectedFlight.destination}`
    )
  );
  console.log(`Data: ${selectedFlight.date}, Hora: ${selectedFlight.time}`);
  console.log(
    `Avião: ${selectedFlight.planeCode}, Status: ${selectedFlight.status}\n`
  );

  const flightReservations = reservations.filter(
    (reservation) => reservation.flightId === flightId
  );

  if (flightReservations.length === 0) {
    console.log(chalk.yellow("Todos os assentos estão livres neste voo."));
  } else {
    console.log(chalk.blue("Assentos ocupados:"));
    flightReservations.forEach((seat) =>
      console.log(
        `Assento ${seat.seatNumber}: Ocupado (Passageiro ID: ${seat.passengerId})`
      )
    );
  }

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "O que você gostaria de fazer?",
      choices: ["Liberar um assento", "Voltar"],
    },
  ]);

  if (action === "Liberar um assento") {
    const { seatNumber } = await inquirer.prompt([
      {
        type: "input",
        name: "seatNumber",
        message: "Informe o número do assento a ser liberado:",
      },
    ]);

    const reservationIndex = reservations.findIndex(
      (reservation) =>
        reservation.flightId === flightId &&
        reservation.seatNumber === seatNumber
    );

    if (reservationIndex === -1) {
      console.log(
        chalk.red(
          `O assento ${seatNumber} não está ocupado ou não existe neste voo.`
        )
      );
      return;
    }

    reservations.splice(reservationIndex, 1);
    saveData(RESERVATIONS_FILE, reservations);

    console.log(
      chalk.green(`O assento ${seatNumber} foi liberado com sucesso!`)
    );
  }
};
