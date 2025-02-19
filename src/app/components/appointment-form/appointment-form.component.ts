import { Component, createNgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatSelectModule} from '@angular/material/select'; 
import { AppointmentService } from 'app/services/appointment.service';
import moment from 'moment';
import { PatientService } from 'app/services/patient.service';
import { Patient } from 'app/interfaces/patient';
import { state } from '@angular/animations';
import { app } from '../../../../server';

@Component({
  selector: 'app-appointment-form',
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSelectModule], 
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  providers: []
})

export class AppointmentFormComponent {
  selectedCenter: { id: number, nom: string; adresse: string; codePostal: string, ville: string  }; // Défaut à null

  creneaux: any | null ;
  dateCreneau: any | null;
  newPatient: Patient = {nom: "", prenom: "", adresse: "", ville: "", email: "", telephone: "", estVaccine: false };

  constructor(private appointmentService: AppointmentService, private patientService: PatientService, private router: Router) {
    this.selectedCenter = history.state.center || null;
  }

  onDateChange(date: string) {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      this.creneaux = this.appointmentService.getCreneauxByCentreAndDateAndEstReserve(this.selectedCenter.id, formattedDate, false).subscribe(creneaux => {
      this.creneaux = creneaux;
    });
  }

  submit(form: any) {
    if (form.valid) {
      if(this.newPatient.creneau !== undefined && this.newPatient.creneau.id !== undefined) {
        this.patientService.createPatient(this.newPatient).subscribe({
          next: (patient) => {
            console.log('Patient ajouté :', patient);
            this.appointmentService.addNewPatient(patient, this.newPatient.creneau!.id).subscribe({
              next(creneau) {
                  console.log('Créneau mis à jour :', creneau);
              },
            });
          }
        });
        this.router.navigate(['/confirmation'], { state: { appointment: this.newPatient } });
      }
    }
  }

  submitAppointment() {
  //   if (!this.selectedCenter.name || !this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.date || !this.formData.time) {
  //     alert("Veuillez remplir tous les champs obligatoires.");
  //     return;
  //   }

  //   const newAppointment = {
  //     firstName: this.formData.firstName,
  //     lastName: this.formData.lastName,
  //     email: this.formData.email,
  //     date: this.formData.date,
  //     time: this.formData.time,
  //     center: this.selectedCenter,
  //     status: 'En attente',
  //   };

  //   // Save to localStorage
  //   const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  //   existingAppointments.push(newAppointment);
  //   localStorage.setItem('appointments', JSON.stringify(existingAppointments));

  //   console.log("Appointment saved:", newAppointment);

  //   // Navigate to confirmation
    //  this.router.navigate(['/confirmation'], { state: { appointment: newAppointment } });
  }
  cancel() {
    this.router.navigate(['/search']); 
  }
}
