import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from 'app/interfaces/patient';
import { PatientService } from 'app/services/patient.service';
import { Centre } from 'app/interfaces/centre';
import { AppointmentService } from 'app/services/appointment.service';
import { Creneau } from 'app/interfaces/creneau';

@Component({
  selector: 'app-manage-planning',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './manage-planning.component.html',
  styleUrls: ['./manage-planning.component.scss']
})
export class ManagePlanningComponent  {
  searchQuery: string = '';
  
  patients: Patient[] = [];
  creneaux: Creneau[] = [];

  displayedColumns: string[] = ['lastName', 'firstName', 'centre', 'date', 'heure', 'statut', 'actions'];
  dataSource = new MatTableDataSource<{ nom: string; prenom: string;  centre: Centre | undefined; date: Date | undefined; heure: string; statut: string }>();
  

  constructor(private patientService: PatientService, private creneauService: AppointmentService) {
    this.creneauService.getCreneauxByEstReserve(true).subscribe(result => {
      this.creneaux = result;
      this.updateTable();
    });
    
  }
  
  updateTable() {
    this.patientService.getAllPatients().subscribe(result => {
      this.dataSource.data = this.mapPatients(result);
    });
  }

  mapPatients(result: Patient[]) {
      return result.map(patient => {
        const creneauAssocie = this.creneaux.find(creneau => creneau.patient?.id === patient.id);
        return {
          id: patient.id,
          nom: patient.nom,
          prenom: patient.prenom,
          creneau: creneauAssocie,
          centre: creneauAssocie?.centre,
          date: creneauAssocie?.date,
          heure: String(creneauAssocie!.heure ),
          minute: Number(creneauAssocie!.minute),
          statut: patient.estVaccine ? 'Vacciné' : 'Non vacciné'
        };
      });
    }

  filterPatient() {
    if (this.searchQuery === '') {
      this.patientService.getAllPatients().subscribe(result => {
        this.dataSource.data = this.mapPatients(result);
      })
    }
    else {
      this.patientService.getAllPatientsByNom(this.searchQuery).subscribe(result => {
        this.dataSource.data = this.mapPatients(result);
      })
    }
  }

  validatePatient(patient: Patient, creneau: Creneau) {
    this.patientService.validerVaccination(patient).subscribe(() => {
      this.creneauService.validerVaccination(creneau).subscribe(() => {
        console.log("Rendez-vous validé :", patient, creneau);
        this.updateTable();
      });
    });
  }

  deleteAppointment(patient_id: number, creneau_id: number) {
    this.creneauService.deleteCreneau(creneau_id).subscribe(() => {
      this.patientService.deletePatient(patient_id).subscribe(() => {
        console.log("Rendez-vous supprimé :", patient_id, creneau_id);
        this.updateTable();
      }); 
    });
    
  }
}