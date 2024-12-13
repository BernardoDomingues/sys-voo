import inquirer from "inquirer";

import { PASSENGERS_FILE } from "../config/paths.js";
import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";

export const registerPassenger = async () => {
  const passengers = loadData(PASSENGERS_FILE);

  const { name, address, phone, loyalty } = await inquirer.prompt([
    { type: "input", name: "name", message: "Nome do passageiro:" },
    { type: "input", name: "address", message: "Endereço do passageiro:" },
    { type: "input", name: "phone", message: "Telefone do passageiro:" },
    {
      type: "confirm",
      name: "loyalty",
      message: "Participa do programa de fidelidade?",
      default: false,
    },
  ]);

  const id =
    passengers.length > 0 ? passengers[passengers.length - 1].id + 1 : 1;
  const newPassenger = {
    id,
    name,
    address,
    phone,
    loyalty,
    loyaltyPoints: 0,
  };

  passengers.push(newPassenger);
  saveData(PASSENGERS_FILE, passengers);

  console.log("Passageiro cadastrado com sucesso!");
};