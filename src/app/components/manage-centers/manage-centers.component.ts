import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CentreService } from 'app/services/centre.service';
import { Centre } from 'app/interfaces/centre';
import { map } from 'rxjs';

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
    MatDialogModule
  ],
  templateUrl: './manage-centers.component.html',
  styleUrls: ['./manage-centers.component.scss']
})


export class ManageCentersComponent {
  searchQuery: string = '';
  
  displayedColumns: string[] = ['name', 'address', 'postalCode', 'city', 'actions'];

  dataSource = new MatTableDataSource<{ nom: string; adresse: string; codePostal: string; ville: string }>();

  constructor(public dialog: MatDialog, private centreService: CentreService) {
    this.centreService.getAllCentres().subscribe(resultCentres => {
      this.dataSource.data = this.mapCentres(resultCentres);
    })
  }

  mapCentres(resultCentres: Centre[]) {
    return resultCentres.map(centre => ({
      nom: centre.nom,
      adresse: centre.adresse,
      codePostal: centre.codePostal,
      ville: centre.ville
    }));
  }

  filterCentres() {
    if (this.searchQuery === '') {
      this.centreService.getAllCentres().subscribe(resultCentres => {
        this.dataSource.data = this.mapCentres(resultCentres);
      })
    }
    else {
      this.centreService.getAllCentresByVille(this.searchQuery).subscribe(resultCentres => {
        this.dataSource.data = this.mapCentres(resultCentres);
      })
    }
  }

  openAddCenterDialog(): void {
    this.dialog.open(AddCenterDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });
  }

  editCenter(center: any) {
    console.log('Editing center:', center);
  }

  deleteCenter(center: any) {
    // console.log('Deleting center:', center);
    // this.centers = this.centers.filter(c => c !== center);
    // this.dataSource.data = this.centers;
  }
}

// --------------------------
// Fenêtre Ajouter un centre
// --------------------------

@Component({
  selector: 'app-add-center-dialog',
  template: `
    <div class="dialog-content">
      <h2>Ajouter un Centre</h2>
      <form #form="ngForm" (ngSubmit)="submit(form)">
        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="newCentre.nom" name="nom" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Adresse</mat-label>
          <input matInput [(ngModel)]="newCentre.adresse" name="adresse" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Code postal</mat-label>
          <input matInput [(ngModel)]="newCentre.codePostal" name="codePostal" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Ville</mat-label>
          <input matInput [(ngModel)]="newCentre.ville" name="ville" required>
        </mat-form-field>
        <div class="dialog-actions">
          <button mat-button (click)="onCancel()">Annuler</button>
          <button mat-flat-button color="primary">Ajouter</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
    .dialog-content {
      padding: 20px;
    }
    .dialog-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
    `
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AddCenterDialog {

  newCentre : Centre = { nom: "", adresse: "", codePostal: "", ville: "" };

  constructor(private centreService: CentreService, public dialogRef: MatDialogRef<AddCenterDialog>) {
    
  }

  submit(form: any) {
    if (form.valid) {
      this.centreService.addCentre(this.newCentre).subscribe({
        next: (centre) => {
          console.log('Patient ajouté :', centre);
        }});
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
