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
import { AddAdminDialog } from './dialogs/add-admin.component';
import { UpdateAdminDialog } from './dialogs/edit-admin.component';
import { UpdatePasswordAdminDialog } from './dialogs/edit-password.component';
import { Centre } from 'app/interfaces/centre';
import { CentreService } from 'app/services/centre.service';

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
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})

export class ManageAdminsComponent {
  searchQuery: string = '';
  
  displayedColumns: string[] = ['lastName', 'firstName', 'login', 'email', 'phone', 'address', 'city', 'centre', 'actions'];
  dataSource = new MatTableDataSource<{ nom: string; prenom: string;  email: string; telephone: string; login: string; adresse: string; ville: string; centre: Centre | null; }>();
  
  centres : Centre[] = [];

  constructor(public dialog: MatDialog, private utilisateurService: UtilisateurService, private centreService: CentreService) {
    this.centreService.getAllCentres().subscribe(result => {
      this.centres = result;

      this.updateTable();
    });
    
  }

  mapAdmins(result: Utilisateur[]) {
    return result.map(utilisateur => {
      let centreAssocie = this.centres.find(centre => Number(centre.administrateur?.id) === Number(utilisateur.id));
      return {
        id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        telephone: utilisateur.telephone,
        role: utilisateur.role,
        login: utilisateur.login,
        adresse: utilisateur.adresse,
        ville: utilisateur.ville,
        centre: centreAssocie ? centreAssocie : null
      };
    });
  }

  updateTable() {
    this.utilisateurService.getAllAdmins().subscribe(result => {
      this.dataSource.data = this.mapAdmins(result);
    })
  }

  filterAdmins() {
    if (this.searchQuery === '') {
      this.utilisateurService.getAllAdmins().subscribe(result => {
        this.dataSource.data = this.mapAdmins(result);
      })
    }
    else {
      this.utilisateurService.getAllAdminsByNom(this.searchQuery).subscribe(result => {
        this.dataSource.data = this.mapAdmins(result);
      })
    }
  }

  addAdmin(): void {
    const dialogRef = this.dialog.open(AddAdminDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }

  editAdmin(admin: any) {
    console.log('Editing admin:', admin);
    const dialogRef = this.dialog.open(UpdateAdminDialog, {
      width: '500px',
      data: admin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });

  }

  editPasswordAdmin(admin: any) {
    console.log('Editing admin:', admin);
    const dialogRef = this.dialog.open(UpdatePasswordAdminDialog, {
      width: '500px',
      data: admin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
    });
  }

  deleteAdmin(admin: any) {
    this.utilisateurService.deleteUtilisateur(admin.id).subscribe({
      next: (utilisateur) => {
        console.log('Utilisateur supprimé :', utilisateur);
        this.updateTable();
    }});
  }
}

