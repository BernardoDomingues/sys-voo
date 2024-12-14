import { PassengerView } from '../passengerView';
import inquirer from 'inquirer';

jest.mock('inquirer');

describe('PassengerView', () => {
  test('Deve retornar os dados corretos quando o formulário é preenchido', async () => {
    inquirer.prompt.mockResolvedValue({
      name: 'John Doe',
      address: 'Rua Teste, 123',
      phone: '123456789',
      loyalty: true,
    });

    const result = await PassengerView.promptDetails();
    expect(result).toEqual({
      name: 'John Doe',
      address: 'Rua Teste, 123',
      phone: '123456789',
      loyalty: true,
    });
  });

  test('Deve exibir mensagem de sucesso ao cadastrar', () => {
    console.log = jest.fn();
    PassengerView.showSuccessMessage();
    expect(console.log).toHaveBeenCalledWith('Passageiro cadastrado com sucesso!');
  });
});
