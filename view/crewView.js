import inquirer from "inquirer";

export const CrewView = {
  async promptDetails() {
    const { name, phone, role } = await inquirer.prompt([
      { type: "input", name: "name", message: "Nome do membro da tripulação:" },
      { type: "input", name: "phone", message: "Telefone do membro da tripulação:" },
      {
        type: "list",
        name: "role",
        message: "Cargo do membro da tripulação:",
        choices: ["Piloto", "Copiloto", "Comissário"],
      },
    ]);

    return { name, phone, role };
  },

  showSuccessMessage() {
    console.log("Membro da tripulação cadastrado com sucesso!");
  },
};
