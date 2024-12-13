import inquirer from "inquirer";
import chalk from "chalk";

export const LoyaltyProgramView = {
  showErrorMessage(message) {
    console.log(chalk.red(message));
  },

  async promptSearchOption() {
    const { searchOption } = await inquirer.prompt([
      {
        type: "list",
        name: "searchOption",
        message: "Deseja buscar por:",
        choices: ["Nome", "ID"],
      },
    ]);
    return searchOption;
  },

  async promptSearchByName() {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Digite o nome do passageiro:",
      },
    ]);
    return name;
  },

  async promptSearchById() {
    const { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Digite o ID do passageiro:",
        validate: (input) => (isNaN(input) ? "O ID deve ser um número." : true),
      },
    ]);
    return parseInt(id, 10);
  },

  showPassengerDetails(passenger) {
    console.log(chalk.blue(`Detalhes do passageiro:`));
    console.log(`Nome: ${passenger.name}`);
    console.log(`ID: ${passenger.id}`);
    console.log(`Pontos de Fidelidade: ${passenger.loyaltyPoints}`);
  },
};
