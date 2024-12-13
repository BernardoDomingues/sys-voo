import inquirer from "inquirer";
import chalk from "chalk";

import { CREW_FILE, FLIGHTS_FILE } from "../config/paths.js";
import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";

export const registerFlight = async () => {
  const flights = loadData(FLIGHTS_FILE);
  const crew = loadData(CREW_FILE);

  if (
    crew.filter((member) => member.role === "Piloto").length === 0 ||
    crew.filter((member) => member.role === "Copiloto").length === 0
  ) {
    console.log(
      chalk.red(
        "Não é possível cadastrar um voo sem pelo menos um piloto e um copiloto cadastrados."
      )
    );
    return;
  }

  const {
    date,
    time,
    origin,
    destination,
    planeCode,
    pilotId,
    copilotId,
    tariff,
  } = await inquirer.prompt([
    { type: "input", name: "date", message: "Data do voo (DD/MM/AAAA):" },
    { type: "input", name: "time", message: "Hora do voo (HH:MM):" },
    { type: "input", name: "origin", message: "Origem do voo:" },
    { type: "input", name: "destination", message: "Destino do voo:" },
    { type: "input", name: "planeCode", message: "Código do avião:" },
    {
      type: "list",
      name: "pilotId",
      message: "Selecione o piloto:",
      choices: crew
        .filter((member) => member.role === "Piloto")
        .map((member) => ({
          name: `${member.name} (ID: ${member.id})`,
          value: member.id,
        })),
    },
    {
      type: "list",
      name: "copilotId",
      message: "Selecione o copiloto:",
      choices: crew
        .filter((member) => member.role === "Copiloto")
        .map((member) => ({
          name: `${member.name} (ID: ${member.id})`,
          value: member.id,
        })),
    },
    { type: "input", name: "tariff", message: "Tarifa do voo:" },
  ]);

  const id = flights.length > 0 ? flights[flights.length - 1].id + 1 : 1;
  const newFlight = {
    id,
    date,
    time,
    origin,
    destination,
    planeCode,
    pilotId,
    copilotId,
    crew: [pilotId, copilotId],
    tariff: parseFloat(tariff),
    status: "Ativo",
  };

  flights.push(newFlight);
  saveData(FLIGHTS_FILE, flights);

  console.log("Voo cadastrado com sucesso!");
};