import inquirer from "inquirer";
import chalk from "chalk";

import { loadData } from "../config/loadData.js";
import { PASSENGERS_FILE } from "../config/paths.js";

export const viewLoyaltyProgram = async () => {
  const passengers = loadData(PASSENGERS_FILE);

  if (passengers.length === 0) {
    console.log(chalk.red("Não há passageiros cadastrados."));
    return;
  }

  const { searchOption } = await inquirer.prompt([
    {
      type: "list",
      name: "searchOption",
      message: "Deseja buscar por:",
      choices: ["Nome", "ID"],
    },
  ]);

  let passenger;

  if (searchOption === "Nome") {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Digite o nome do passageiro:",
      },
    ]);

    passenger = passengers.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
  } else {
    const { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Digite o ID do passageiro:",
        validate: (input) => (isNaN(input) ? "O ID deve ser um número." : true),
      },
    ]);

    passenger = passengers.find((p) => p.id === parseInt(id, 10));
  }

  if (!passenger) {
    console.log(chalk.red("Passageiro não encontrado."));
    return;
  }

  console.log(chalk.blue(`Detalhes do passageiro:`));
  console.log(`Nome: ${passenger.name}`);
  console.log(`ID: ${passenger.id}`);
  console.log(`Pontos de Fidelidade: ${passenger.loyaltyPoints}`);
};
