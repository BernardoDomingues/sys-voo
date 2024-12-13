import inquirer from "inquirer";
import { PassengerController } from "./controller/passengerController.js";
import { CrewController } from "./controller/crewController.js";
import { FlightController } from "./controller/flightController.js";
import { ReservationController } from "./controller/reservationController.js";
import { LoyaltyProgramController } from "./controller/loyaltyProgramController.js";
import { SeatManagementController } from "./controller/seatManagementController.js";

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
      await PassengerController.registerPassenger();
      break;
    case choices[1]:
      await CrewController.registerCrewMember();;
      break;
    case choices[2]:
      await FlightController.registerFlight();
      break;
    case choices[3]:
      await ReservationController.makeReservation();
      break;
    case choices[4]:
      await SeatManagementController.manageSeats();
      break;
    case choices[5]:
      await LoyaltyProgramController.viewLoyaltyProgram();
      break;
    case choices[6]:
      console.log("Saindo...");
      process.exit(0);
  }

  mainMenu();
};

mainMenu();
