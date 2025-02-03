import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: '',
  };

  selectedCenter: any = { name: 'Aucun centre sélectionné', address: 'Veuillez choisir un centre' };

  constructor(private router: Router) {}

  ngOnInit() {
    const savedCenter = localStorage.getItem('selectedCenter');
    if (savedCenter) {
      this.selectedCenter = JSON.parse(savedCenter);
      console.log("Centre chargé dans Appointment Form:", this.selectedCenter);
    }
  }

  submitAppointment() {
    if (!this.selectedCenter.name || !this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.date || !this.formData.time) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newAppointment = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
      date: this.formData.date,
      time: this.formData.time,
      center: this.selectedCenter,
      status: 'En attente',
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingAppointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    console.log("Appointment saved:", newAppointment);

    // Navigate to confirmation
    this.router.navigate(['/confirmation'], { state: { appointment: newAppointment } });
  }
}
