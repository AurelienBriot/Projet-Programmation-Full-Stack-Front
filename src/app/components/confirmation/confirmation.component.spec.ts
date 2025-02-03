import { Component } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, DatePipe]
})
export class ConfirmationComponent {
  reservationDetails: any;

  constructor(private datePipe: DatePipe) {
    const state = history.state;

    console.log("Données reçues sur la page Confirmation :", state.formData);

    this.reservationDetails = {
      firstName: state.formData?.firstName || '',
      lastName: state.formData?.lastName || '',
      email: state.formData?.email || '',
      date: this.formatDate(state.formData?.date),
      time: this.formatTime(state.formData?.time),
      center: state.center || { name: '', address: '' },
    };
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    return this.datePipe.transform(new Date(date), 'EEEE d MMMM yyyy', 'fr-FR') || '';
  }

  formatTime(time: string | undefined): string {
    if (!time) return '';
    return this.datePipe.transform(`1970-01-01T${time}:00`, 'HH:mm', 'fr-FR') || '';
  }

  makeNewReservation() {
    window.location.href = '/search';
  }
}
