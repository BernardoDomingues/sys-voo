import inquirer from "inquirer";

import { CREW_FILE } from "../config/paths.js";
import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";

export const registerCrew = async () => {
  const crew = loadData(CREW_FILE);

  const { name, phone, role } = await inquirer.prompt([
    { type: "input", name: "name", message: "Nome do membro da tripulação:" },
    {
      type: "input",
      name: "phone",
      message: "Telefone do membro da tripulação:",
    },
    {
      type: "list",
      name: "role",
      message: "Cargo do membro da tripulação:",
      choices: ["Piloto", "Copiloto", "Comissário"],
    },
  ]);

  const id = crew.length > 0 ? crew[crew.length - 1].id + 1 : 1;
  const newCrewMember = {
    id,
    name,
    phone,
    role,
  };

  crew.push(newCrewMember);
  saveData(CREW_FILE, crew);

  console.log("Membro da tripulação cadastrado com sucesso!");
};
