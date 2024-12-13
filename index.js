import inquirer from "inquirer";
import { registerPassenger } from "./controller/registerPassenger.js";
import { registerCrew } from "./controller/registerCrew.js";
import { registerFlight } from "./controller/registerFlight.js";
import { makeReservation } from "./controller/makeReservation.js";
import { manageSeats } from "./controller/manageSeats.js";
import { viewLoyaltyProgram } from "./controller/viewLoyaltyProgram.js";

const mainMenu = async () => {
  const choices = [
    "1. Cadastrar Passageiro",
    "2. Cadastrar Tripulação",
    "3. Cadastrar Voo",
    "4. Fazer Reserva",
    "5. Gerenciar Assentos",
    "6. Consultar Programa de Fidelidade",
    "7. Sair",
  ];

  const { option } = await inquirer.prompt([
    {
      type: "list",
      name: "option",
      message: "Selecione uma opção:",
      choices,
    },
  ]);

  switch (option) {
    case choices[0]:
      await registerPassenger();
      break;
    case choices[1]:
      await registerCrew();
      break;
    case choices[2]:
      await registerFlight();
      break;
    case choices[3]:
      await makeReservation();
      break;
    case choices[4]:
      await manageSeats();
      break;
    case choices[5]:
      await viewLoyaltyProgram();
      break;
    case choices[6]:
      console.log("Saindo...");
      process.exit(0);
  }

  mainMenu();
};

mainMenu();
