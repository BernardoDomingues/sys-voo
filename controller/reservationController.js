import { Flight } from "../model/flightModel.js";
import { Passenger } from "../model/passengerModel.js";
import { Reservation } from "../model/reservationModel.js";
import { ReservationView } from "../view/reservationView.js";

export const ReservationController = {
  async makeReservation() {
    const flights = Flight.getAll();
    const passengers = Passenger.getAll();

    if (flights.length === 0) {
      ReservationView.showError("Não há voos cadastrados.");
      return;
    }

    if (passengers.length === 0) {
      ReservationView.showError("Não há passageiros cadastrados.");
      return;
    }

    const { flightId, passengerId, seatNumber } = await ReservationView.promptReservationDetails(flights, passengers);

    if (!Flight.isFlightActive(flightId)) {
      ReservationView.showError("O voo selecionado não está ativo.");
      return;
    }

    if (Reservation.isSeatTaken(flightId, seatNumber)) {
      ReservationView.showError(`O assento ${seatNumber} já está ocupado neste voo.`);
      return;
    }

    Reservation.create(flightId, passengerId, seatNumber);

    const passenger = passengers.find((p) => p.id === passengerId);
    if (passenger?.loyalty) {
      Passenger.updateLoyaltyPoints(passengerId, 10);
      ReservationView.showSuccess(
        `Passageiro ${passenger.name} ganhou 10 pontos de fidelidade!`
      );
    }

    ReservationView.showSuccess("Reserva feita com sucesso!");
  },
};
