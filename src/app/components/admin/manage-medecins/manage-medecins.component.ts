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
import { AddMedecinDialog } from './dialogs/add-medecin.component';
import { UpdateMedecinDialog } from './dialogs/edit-medecin.component';
import { UpdatePasswordMedecinDialog } from './dialogs/edit-password.component';
import { Centre } from 'app/interfaces/centre';
import { CentreService } from 'app/services/centre.service';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-manage-super-medecins',
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
  templateUrl: './manage-medecins.component.html',
  styleUrls: ['./manage-medecins.component.scss']
})

export class ManageMedecinsComponent {
  getLoginService() {
    return this.loginService;
  }
  searchQuery: string = '';
  
  displayedColumns: string[] = ['lastName', 'firstName', 'login', 'email', 'phone', 'address', 'city', 'centre', 'actions'];
  dataSource = new MatTableDataSource<{ nom: string; prenom: string;  email: string; telephone: string; login: string; adresse: string; ville: string; centre: Centre | null; }>();
  
  centres : Centre[] = [];

  constructor(public dialog: MatDialog, private utilisateurService: UtilisateurService, private centreService: CentreService, private loginService: LoginService) {
    this.centreService.getAllCentres().subscribe(result => {
      this.centres = result;

      this.updateTable();
    });
    
  }

  mapMedecins(result: Utilisateur[]) {
    return result.map(utilisateur => {
      const centreAssocie = this.centres.find(centre => Number(centre.administrateur?.id) === Number(utilisateur.id));
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
    this.utilisateurService.getAllMedecins().subscribe(result => {
      this.dataSource.data = this.mapMedecins(result);
    })
  }

  filterMedecins() {
    if (this.searchQuery === '') {
      this.utilisateurService.getAllMedecins().subscribe(result => {
        this.dataSource.data = this.mapMedecins(result);
      })
    }
    else {
      this.utilisateurService.getAllMedecinsByNom(this.searchQuery).subscribe(result => {
        this.dataSource.data = this.mapMedecins(result);
      })
    }
  }

  addMedecin(): void {
    const dialogRef = this.dialog.open(AddMedecinDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }

  editMedecin(medecin: any) {
    console.log('Editing medecin:', medecin);
    const dialogRef = this.dialog.open(UpdateMedecinDialog, {
      width: '500px',
      data: medecin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });

  }

  editPasswordMedecin(medecin: any) {
    console.log('Editing medecin:', medecin);
    const dialogRef = this.dialog.open(UpdatePasswordMedecinDialog, {
      width: '500px',
      data: medecin,
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
    });
  }

  deleteMedecin(medecin: any) {
    this.utilisateurService.deleteUtilisateur(medecin.id).subscribe({
      next: (utilisateur) => {
        console.log('Utilisateur supprimé :', utilisateur);
        this.updateTable();
    }});
  }
}

