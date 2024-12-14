import { Crew } from "../../model/crewModel";
import { CrewView } from "../../view/crewView";
import { CrewController } from "../crewController";

jest.mock("../../model/crewModel");
jest.mock("../../view/crewView");

describe("CrewController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Deve cadastrar um membro da tripulação com dados válidos", async () => {
    CrewView.promptDetails.mockResolvedValue({
      name: "João Silva",
      phone: "(11) 98765-4321",
      role: "Piloto",
    });
    CrewView.showSuccessMessage.mockImplementation(() => {});

    Crew.create.mockImplementation(() => {});

    await CrewController.registerCrewMember();

    expect(Crew.create).toHaveBeenCalledWith(
      "João Silva",
      "(11) 98765-4321",
      "Piloto"
    );

    expect(CrewView.showSuccessMessage).toHaveBeenCalled();
  });

  test("Deve lidar com dados ausentes", async () => {
    CrewView.promptDetails.mockResolvedValue({
      name: "",
      phone: "",
      role: "",
    });

    await CrewController.registerCrewMember();

    expect(Crew.create).not.toHaveBeenCalled();

    expect(CrewView.showSuccessMessage).not.toHaveBeenCalled();
  });

  test("Deve lidar com exceções no processo de registro", async () => {
    CrewView.promptDetails.mockResolvedValue({
      name: "Maria Souza",
      phone: "(21) 91234-5678",
      role: "Copiloto",
    });
    Crew.create.mockImplementation(() => {
      throw new Error("Erro ao cadastrar");
    });

    await expect(CrewController.registerCrewMember()).rejects.toThrow(
      "Erro ao cadastrar"
    );

    expect(CrewView.showSuccessMessage).not.toHaveBeenCalled();
  });
});
