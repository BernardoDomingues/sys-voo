import { Crew } from "../model/crewModel.js";
import { CrewView } from "../view/crewView.js";

export const CrewController = {
  async registerCrewMember() {
    const { name, phone, role } = await CrewView.promptDetails();
    Crew.create(name, phone, role);
    CrewView.showSuccessMessage();
  },
};
