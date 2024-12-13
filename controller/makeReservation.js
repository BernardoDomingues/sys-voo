import chalk from "chalk";
import inquirer from "inquirer";

import { loadData } from "../config/loadData.js";
import { FLIGHTS_FILE, PASSENGERS_FILE, RESERVATIONS_FILE } from "../config/paths.js";
import { saveData } from "../config/saveData.js";

export const makeReservation = async () => {
  const flights = loadData(FLIGHTS_FILE);
  const passengers = loadData(PASSENGERS_FILE);
  const reservations = loadData(RESERVATIONS_FILE);

  if (flights.length === 0) {
    console.log(chalk.red("Não há voos cadastrados."));
    return;
  }

  if (passengers.length === 0) {
    console.log(chalk.red("Não há passageiros cadastrados."));
    return;
  }

  const { flightId, passengerId, seatNumber } = await inquirer.prompt([
    {
      type: "list",
      name: "flightId",
      message: "Selecione o voo:",
      choices: flights
        .filter((flight) => flight.status === "Ativo")
        .map((flight) => ({
          name: `${flight.origin} -> ${flight.destination} (ID: ${flight.id})`,
          value: flight.id,
        })),
    },
    {
      type: "list",
      name: "passengerId",
      message: "Selecione o passageiro:",
      choices: passengers.map((passenger) => ({
        name: `${passenger.name} (ID: ${passenger.id})`,
        value: passenger.id,
      })),
    },
    {
      type: "input",
      name: "seatNumber",
      message: "Número do assento:",
    },
  ]);

  const selectedFlight = flights.find((flight) => flight.id === flightId);

  if (selectedFlight.status !== "Ativo") {
    console.log(chalk.red("O voo selecionado não está ativo."));
    return;
  }

  const seatTaken = reservations.some(
    (reservation) =>
      reservation.flightId === flightId && reservation.seatNumber === seatNumber
  );

  if (seatTaken) {
    console.log(
      chalk.red(`O assento ${seatNumber} já está ocupado neste voo.`)
    );
    return;
  }

  const newReservation = {
    id:
      reservations.length > 0
        ? reservations[reservations.length - 1].id + 1
        : 1,
    flightId,
    passengerId,
    seatNumber,
  };

  reservations.push(newReservation);
  saveData(RESERVATIONS_FILE, reservations);

  const passenger = passengers.find((p) => p.id === passengerId);
  if (passenger.loyalty) {
    passenger.loyaltyPoints += 10;
    saveData(PASSENGERS_FILE, passengers);
    console.log(
      chalk.green(
        `Passageiro ${passenger.name} ganhou 10 pontos de fidelidade!`
      )
    );
  }

  console.log(chalk.green("Reserva feita com sucesso!"));
};
