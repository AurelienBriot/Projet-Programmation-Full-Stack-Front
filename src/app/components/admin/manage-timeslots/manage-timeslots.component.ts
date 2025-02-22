import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule,  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddCreneauDialog } from './dialogs/add-timeslot.component';
import { AppointmentService } from 'app/services/appointment.service';
import { Creneau } from 'app/interfaces/creneau';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-manage-centers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './manage-timeslots.component.html',
  styleUrls: ['./manage-timeslots.component.scss']
})


export class ManageTimeslotsComponent {
  searchQuery: string = '';
  
  displayedColumns: string[] = ['centre', 'date', 'heure', 'estReserve', 'actions'];

  dataSource = new MatTableDataSource<{ nom: string | undefined ; date: Date | undefined; heure: string; estReserve: string; }>();

  constructor(public dialog: MatDialog, private creneauService: AppointmentService) {
    this.updateTable();
  }
  
  updateTable() {
    this.creneauService.getAllCreneaux().subscribe(result => {
      this.dataSource.data = this.mapCreneaux(result);
    });
  }

  mapCreneaux(result: Creneau[]) {
    return result.map(creneau => ({
      id: creneau.id,
      nom: creneau.centre?.nom,
      centre: creneau.centre,
      heure: String(creneau.heure),
      minute: Number(creneau.minute),
      date: creneau.date,
      estReserve: creneau.estReserve? 'Réservé' : 'Non réservé'
    }));
  }

  openAddCreneauDialog(): void {
    const dialogRef = this.dialog.open(AddCreneauDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }

  deleteCreneau(creneau: any) {
    this.creneauService.deleteCreneau(creneau.id).subscribe({
      next: (c) => {
        console.log('Créneau supprimé :', c);
        this.updateTable();
    }});
  }
}