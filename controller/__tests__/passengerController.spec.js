import { Passenger } from "../../model/passengerModel";
import { PassengerView } from "../../view/passengerView";
import { PassengerController } from "../passengerController";

jest.mock('../../model/passengerModel');
jest.mock('../passengerController');

describe('PassengerController', () => {
  test('Deve registrar um passageiro com sucesso', async () => {
    PassengerView.promptDetails.mockResolvedValue({
      name: 'John Doe',
      address: 'Rua Teste, 123',
      phone: '123456789',
      loyalty: true,
    });
    Passenger.create.mockImplementation(() => {});
    PassengerView.showSuccessMessage.mockImplementation(() => {});

    await PassengerController.registerPassenger();

    expect(Passenger.create).toHaveBeenCalledWith(
      'John Doe',
      'Rua Teste, 123',
      '123456789',
      true
    );
    expect(PassengerView.showSuccessMessage).toHaveBeenCalled();
  });
});
