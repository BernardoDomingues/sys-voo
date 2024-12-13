import inquirer from "inquirer";

export const PassengerView = {
  async promptDetails() {
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

    return { name, address, phone, loyalty };
  }

  ,showSuccessMessage() {
    console.log("Passageiro cadastrado com sucesso!");
  }
};
