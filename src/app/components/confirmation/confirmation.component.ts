import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  reservationDetails: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { appointment?: any };

    if (state && state.appointment) {
      this.reservationDetails = state.appointment;
      console.log("Appointment received in Confirmation:", this.reservationDetails);
    } else {
      console.error("No appointment data received!");
      this.reservationDetails = null;
    }
  }

  makeNewReservation() {
    this.router.navigate(['/search']);
  }
}
