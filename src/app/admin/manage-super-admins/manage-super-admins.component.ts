import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-super-admins',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './manage-super-admins.component.html',
  styleUrls: ['./manage-super-admins.component.scss']
})
export class ManageSuperAdminsComponent {
  searchQuery: string = '';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password', 'actions'];
  dataSource = new MatTableDataSource<{ firstName: string; lastName: string; email: string; password: string }>();
  superAdmins: { firstName: string; lastName: string; email: string; password: string }[] = [
    { firstName: 'Jean', lastName: 'Dupont', email: 'jean.dupont@email.com', password: '********' },
    { firstName: 'Alice', lastName: 'Martin', email: 'alice.martin@email.com', password: '********' }
  ];

  constructor(public dialog: MatDialog) {
    this.dataSource.data = this.superAdmins;
  }

  filterSuperAdmins() {
    this.dataSource.data = this.superAdmins.filter(superAdmin =>
      superAdmin.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      superAdmin.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      superAdmin.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addSuperAdmin(): void {
    const dialogRef = this.dialog.open(AddSuperAdminDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.superAdmins.push(result);
        this.dataSource.data = [...this.superAdmins];
      }
    });
  }

  editSuperAdmin(superAdmin: any): void {
    console.log('Editing super admin:', superAdmin);
    const dialogRef = this.dialog.open(AddSuperAdminDialog, {
      width: '500px',
      data: superAdmin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(updatedAdmin => {
      if (updatedAdmin) {
        const index = this.superAdmins.findIndex(sa => sa.email === superAdmin.email);
        if (index !== -1) {
          this.superAdmins[index] = updatedAdmin;
          this.dataSource.data = [...this.superAdmins];
        }
      }
    });
  }

  deleteSuperAdmin(superAdmin: any) {
    this.superAdmins = this.superAdmins.filter(sa => sa !== superAdmin);
    this.dataSource.data = this.superAdmins;
  }
}

@Component({
  selector: 'app-add-super-admin-dialog',
  template: `
    <div class="dialog-content">
      <h2>Ajouter un Super Admin</h2>
      <form [formGroup]="superAdminForm" class="fixed-form">
        <mat-form-field appearance="outline">
          <mat-label>Prénom</mat-label>
          <input matInput formControlName="firstName">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input matInput formControlName="lastName">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Mot de passe</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
        <div class="dialog-actions">
          <button mat-button (click)="onCancel()">Annuler</button>
          <button mat-flat-button color="primary" (click)="submitForm()">Enregistrer</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
    .dialog-content {
      padding: 20px;
      max-width: 450px;
    }
    .dialog-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }
    `
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AddSuperAdminDialog {
  superAdminForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddSuperAdminDialog>) {
    this.superAdminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.superAdminForm.valid) {
      this.dialogRef.close(this.superAdminForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
