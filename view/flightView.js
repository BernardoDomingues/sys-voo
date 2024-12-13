import inquirer from "inquirer";
import chalk from "chalk";

export const FlightView = {
  showErrorMessage() {
    console.log(
      chalk.red(
        "Não é possível cadastrar um voo sem pelo menos um piloto e um copiloto cadastrados."
      )
    );
  },

  async promptDetails(pilotChoices, copilotChoices) {
    return await inquirer.prompt([
      { type: "input", name: "date", message: "Data do voo (DD/MM/AAAA):" },
      { type: "input", name: "time", message: "Hora do voo (HH:MM):" },
      { type: "input", name: "origin", message: "Origem do voo:" },
      { type: "input", name: "destination", message: "Destino do voo:" },
      { type: "input", name: "planeCode", message: "Código do avião:" },
      {
        type: "list",
        name: "pilotId",
        message: "Selecione o piloto:",
        choices: pilotChoices,
      },
      {
        type: "list",
        name: "copilotId",
        message: "Selecione o copiloto:",
        choices: copilotChoices,
      },
      { type: "input", name: "tariff", message: "Tarifa do voo:" },
    ]);
  },

  showSuccessMessage() {
    console.log("Voo cadastrado com sucesso!");
  },
};
