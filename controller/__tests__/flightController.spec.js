import { Crew } from "../../model/crewModel";
import { Flight } from "../../model/flightModel";
import { FlightView } from "../../view/flightView";
import { FlightController } from "../flightController";

describe('Testes de Cadastro de Voo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Caso 1: Tentativa de cadastrar um voo sem pilotos ou copilotos', async () => {
    jest.spyOn(Crew, 'getAll').mockReturnValue([]);
    const showErrorMock = jest.spyOn(FlightView, 'showErrorMessage').mockImplementation(() => {});

    await FlightController.registerFlight();

    expect(showErrorMock).toHaveBeenCalledWith();
    expect(showErrorMock).toHaveBeenCalledTimes(1);
  });

  test('Caso 2: Cadastro de voo com todos os detalhes preenchidos', async () => {
    const mockCrew = [
      { id: 1, name: 'Piloto 1', role: 'Piloto' },
      { id: 2, name: 'Copiloto 1', role: 'Copiloto' },
    ];
    jest.spyOn(Crew, 'getAll').mockReturnValue(mockCrew);

    const promptDetailsMock = jest
      .spyOn(FlightView, 'promptDetails')
      .mockResolvedValue({
        date: '10/12/2024',
        time: '14:00',
        origin: 'São Paulo',
        destination: 'Rio de Janeiro',
        planeCode: 'AB1234',
        pilotId: 1,
        copilotId: 2,
        tariff: '500.00',
      });

    const createFlightMock = jest.spyOn(Flight, 'create').mockImplementation(() => {});
    const showSuccessMock = jest.spyOn(FlightView, 'showSuccessMessage').mockImplementation(() => {});

    await FlightController.registerFlight();

    expect(promptDetailsMock).toHaveBeenCalledTimes(1);
    expect(createFlightMock).toHaveBeenCalledWith(
      '10/12/2024',
      '14:00',
      'São Paulo',
      'Rio de Janeiro',
      'AB1234',
      1,
      2,
      '500.00'
    );
    expect(showSuccessMock).toHaveBeenCalledTimes(1);
  });

  test('Caso 3: Validação da seleção de pilotos e copilotos', async () => {
    const mockCrew = [
      { id: 1, name: 'Piloto 1', role: 'Piloto' },
      { id: 3, name: 'Piloto 2', role: 'Piloto' },
      { id: 2, name: 'Copiloto 1', role: 'Copiloto' },
    ];
    jest.spyOn(Crew, 'getAll').mockReturnValue(mockCrew);

    const promptDetailsMock = jest.spyOn(FlightView, 'promptDetails');

    await FlightController.registerFlight();

    expect(promptDetailsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        { name: 'Piloto 1 (ID: 1)', value: 1 },
        { name: 'Piloto 2 (ID: 3)', value: 3 },
      ]),
      expect.arrayContaining([
        { name: 'Copiloto 1 (ID: 2)', value: 2 },
      ])
    );
  });

  test('Caso 4: Validação de entradas inválidas', async () => {
    const mockCrew = [
      { id: 1, name: 'Piloto 1', role: 'Piloto' },
      { id: 2, name: 'Copiloto 1', role: 'Copiloto' },
    ];
    jest.spyOn(Crew, 'getAll').mockReturnValue(mockCrew);

    const createFlightMock = jest.spyOn(Flight, 'create').mockImplementation(() => {});

    await FlightController.registerFlight();

    expect(createFlightMock).not.toHaveBeenCalled();
  });

  test('Caso 5: Mensagem de sucesso ao cadastrar o voo', async () => {
    const mockCrew = [
      { id: 1, name: 'Piloto 1', role: 'Piloto' },
      { id: 2, name: 'Copiloto 1', role: 'Copiloto' },
    ];
    jest.spyOn(Crew, 'getAll').mockReturnValue(mockCrew);

    jest.spyOn(FlightView, 'promptDetails').mockResolvedValue({
      date: '10/12/2024',
      time: '14:00',
      origin: 'São Paulo',
      destination: 'Rio de Janeiro',
      planeCode: 'AB1234',
      pilotId: 1,
      copilotId: 2,
      tariff: '500.00',
    });

    const showSuccessMock = jest.spyOn(FlightView, 'showSuccessMessage').mockImplementation(() => {});

    await FlightController.registerFlight();

    expect(showSuccessMock).toHaveBeenCalledTimes(1);
  });
});
