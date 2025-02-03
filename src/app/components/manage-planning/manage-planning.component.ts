import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-planning',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './manage-planning.component.html',
  styleUrls: ['./manage-planning.component.scss']
})
export class ManagePlanningComponent implements OnInit {
  searchTerm: string = '';
  reservations: any[] = [];
  filteredReservations: any[] = [];

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    const storedReservations = JSON.parse(localStorage.getItem('appointments') || '[]');
    this.reservations = storedReservations;
    this.filteredReservations = [...this.reservations];
  }

  filterAppointments() {
    const query = this.searchTerm.toLowerCase();
    this.filteredReservations = this.reservations.filter(
      (reservation) =>
        reservation.firstName.toLowerCase().includes(query) ||
        reservation.lastName.toLowerCase().includes(query)
    );
  }

  validateAppointment(reservation: any) {
    reservation.status = 'Validé';

    // Update in localStorage
    const updatedReservations = this.reservations.map((res) =>
      res === reservation ? { ...res, status: 'Validé' } : res
    );
    localStorage.setItem('appointments', JSON.stringify(updatedReservations));
  }

  deleteAppointment(reservation: any) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      // Remove from the array
      this.reservations = this.reservations.filter((res) => res !== reservation);
      this.filteredReservations = [...this.reservations];

      // Update localStorage
      localStorage.setItem('appointments', JSON.stringify(this.reservations));
      console.log("🗑️ Rendez-vous supprimé :", reservation);
    }
  }
}