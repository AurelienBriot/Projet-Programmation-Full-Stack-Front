import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Utilisateur } from 'app/interfaces/utilisateur';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { AddSuperAdminDialog } from './dialogs/add-super-admin.component';
import { UpdateSuperAdminDialog } from './dialogs/edit-super-admin.component';
import { UpdatePasswordSuperAdminDialog } from './dialogs/edit-password.component';

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
  
  displayedColumns: string[] = ['lastName', 'firstName', 'login', 'email', 'phone', 'address', 'city', 'actions'];
  dataSource = new MatTableDataSource<{ nom: string; prenom: string;  email: string; telephone: string; login: string; adresse: string; ville: string }>();
  

  constructor(public dialog: MatDialog, private utilisateurService: UtilisateurService) {
    this.updateTable();
  }

  mapSuperAdmins(result: Utilisateur[]) {
      return result.map(utilisateur => ({
        id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        telephone: utilisateur.telephone,
        role: utilisateur.role,
        login: utilisateur.login,
        adresse: utilisateur.adresse,
        ville: utilisateur.ville
      }));
    }

  updateTable() {
    this.utilisateurService.getAllSuperAdmins().subscribe(result => {
      this.dataSource.data = this.mapSuperAdmins(result);
    })
  }

  filterSuperAdmins() {
    if (this.searchQuery === '') {
      this.utilisateurService.getAllSuperAdmins().subscribe(result => {
        this.dataSource.data = this.mapSuperAdmins(result);
      })
    }
    else {
      this.utilisateurService.getAllSuperAdminsByNom(this.searchQuery).subscribe(result => {
        this.dataSource.data = this.mapSuperAdmins(result);
      })
    }
  }

  addSuperAdmin(): void {
    const dialogRef = this.dialog.open(AddSuperAdminDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }

  editSuperAdmin(superAdmin: any) {
    console.log('Editing super admin:', superAdmin);
    const dialogRef = this.dialog.open(UpdateSuperAdminDialog, {
      width: '500px',
      data: superAdmin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });

  }

  editPasswordSuperAdmin(superAdmin: any) {
    console.log('Editing super admin:', superAdmin);
    const dialogRef = this.dialog.open(UpdatePasswordSuperAdminDialog, {
      width: '500px',
      data: superAdmin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
    });
  }

  deleteSuperAdmin(superAdmin: any) {
    this.utilisateurService.deleteUtilisateur(superAdmin.id).subscribe({
      next: (utilisateur) => {
        console.log('Utilisateur supprimé :', utilisateur);
        this.updateTable();
    }});
  }
}

