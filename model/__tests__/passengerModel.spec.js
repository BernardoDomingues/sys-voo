import { loadData } from "../../config/loadData";
import { saveData } from "../../config/saveData";
import { Passenger } from "../passengerModel";

jest.mock('../../config/saveData');
jest.mock('../../config/loadData');

describe('Passenger', () => {
  test('Deve criar um novo passageiro corretamente', () => {
    loadData.mockReturnValue([]);
    saveData.mockImplementation(() => {});

    Passenger.create('John Doe', 'Rua Teste, 123', '123456789', true);

    expect(saveData).toHaveBeenCalledWith(expect.anything(), [
      { id: 1, name: 'John Doe', address: 'Rua Teste, 123', phone: '123456789', loyalty: true, loyaltyPoints: 0 },
    ]);
  });

  test('Deve atualizar os pontos de fidelidade de um passageiro', () => {
    loadData.mockReturnValue([{ id: 1, loyaltyPoints: 0 }]);
    saveData.mockImplementation(() => {});

    Passenger.updateLoyaltyPoints(1, 10);

    expect(saveData).toHaveBeenCalledWith(expect.anything(), [
      { id: 1, loyaltyPoints: 10 },
    ]);
  });

  test('Não deve atualizar pontos de fidelidade para passageiro inexistente', () => {
    loadData.mockReturnValue([{ id: 1, loyaltyPoints: 0 }]);
    saveData.mockImplementation(() => {});

    Passenger.updateLoyaltyPoints(99, 10);

    expect(saveData).not.toHaveBeenCalled();
  });
});
