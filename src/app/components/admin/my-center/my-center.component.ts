import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-my-center',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './my-center.component.html',
  styleUrls: ['./my-center.component.scss']
})
export class MyCenterComponent {
  searchQuery: string = '';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'center', 'actions'];
  dataSource = new MatTableDataSource<{ firstName: string; lastName: string; email: string; role: string; center: string }>();
  users: { firstName: string; lastName: string; email: string; role: string; center: string }[] = [
    { firstName: 'Dr. Pierre', lastName: 'Dubois', email: 'pierre.dubois@hospital.com', role: 'Médecin', center: 'CH Narbonne' },
    { firstName: 'Sophie', lastName: 'Lambert', email: 'sophie.lambert@admin.com', role: 'Administrateur', center: 'CH Montpellier' }
  ];

  constructor(public dialog: MatDialog) {
    this.dataSource.data = this.users;
  }

  filterUsers() {
    this.dataSource.data = this.users.filter(user =>
      user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users.push(result);
        this.dataSource.data = [...this.users];
      }
    });
  }

  editUser(user: any) {
    console.log('Editing user:', user);
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
    this.dataSource.data = this.users;
  }
}

@Component({
  selector: 'app-add-user-dialog',
  template: `
    <div class="dialog-content">
      <h2>Ajouter un Utilisateur</h2>
      <form [formGroup]="userForm" class="fixed-form">
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Prénom</mat-label>
            <input matInput formControlName="firstName">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput formControlName="lastName">
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Mot de passe</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Rôle</mat-label>
          <mat-select formControlName="role">
            <mat-option value="Administrateur">Administrateur</mat-option>
            <mat-option value="Utilisateur">Utilisateur</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Centre de rattachement</mat-label>
          <mat-select formControlName="center">
            <mat-option value="CH Narbonne">CH Narbonne</mat-option>
            <mat-option value="CH Montpellier">CH Montpellier</mat-option>
          </mat-select>
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
      padding: 15px;
      width: 400px;
      max-height: 500px; 
    }
    .dialog-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .fixed-form {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    `
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,  MatSelectModule,
    MatOptionModule]
})
export class AddUserDialog {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialog>) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      center: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
