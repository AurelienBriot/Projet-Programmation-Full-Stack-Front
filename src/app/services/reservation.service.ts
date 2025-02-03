import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: any[] = [];

  addReservation(reservation: any) {
    this.reservations.push(reservation);
  }

  getReservations() {
    return this.reservations;
  }
}
