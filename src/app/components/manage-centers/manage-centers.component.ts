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
  dataSource = new MatTableDataSource<{ name: string; address: string; postalCode: string; city: string }>();
  centers: { name: string; address: string; postalCode: string; city: string }[] = [
    { name: 'CH Narbonne', address: 'Boulevard Dr Lacroix', postalCode: '11000', city: 'Narbonne' }
  ];

  constructor(public dialog: MatDialog) {
    this.dataSource.data = this.centers;
  }

  filterData() {
    this.dataSource.data = this.centers.filter(center =>
      center.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
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
    console.log('Deleting center:', center);
    this.centers = this.centers.filter(c => c !== center);
    this.dataSource.data = this.centers;
  }
}

@Component({
  selector: 'app-add-center-dialog',
  template: `
    <div class="dialog-content">
      <h2>Ajouter un Centre</h2>
      <form [formGroup]="centerForm">
        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Adresse</mat-label>
          <input matInput formControlName="address">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Code postal</mat-label>
          <input matInput formControlName="postalCode">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Ville</mat-label>
          <input matInput formControlName="city">
        </mat-form-field>
        <div class="dialog-actions">
          <button mat-button (click)="onCancel()">Annuler</button>
          <button mat-flat-button color="primary" (click)="submitForm()">Ajouter</button>
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
  centerForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCenterDialog>) {
    this.centerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.centerForm.valid) {
      console.log('New Center:', this.centerForm.value);
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
