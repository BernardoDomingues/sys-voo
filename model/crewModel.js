import { loadData } from "../config/loadData.js";
import { saveData } from "../config/saveData.js";
import { CREW_FILE } from "../config/paths.js";

export const Crew = {
  getAll: () => loadData(CREW_FILE),

  create: (name, phone, role) => {
    const crew = Crew.getAll();
    const id = crew.length > 0 ? crew[crew.length - 1].id + 1 : 1;
    const newCrewMember = { id, name, phone, role };

    crew.push(newCrewMember);
    saveData(CREW_FILE, crew);
  },
};
