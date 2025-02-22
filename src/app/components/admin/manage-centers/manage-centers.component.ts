import { Component } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule,  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CentreService } from 'app/services/centre.service';
import { Centre } from 'app/interfaces/centre';
import { LoginService } from 'app/services/login.service';
import { AddCenterDialog } from './dialogs/add-center.component';
import { UpdateCenterDialog } from './dialogs/edit-center.component';
import { Utilisateur } from 'app/interfaces/utilisateur';

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
  
  displayedColumns: string[] = ['name', 'address', 'postalCode', 'city', 'admin', 'actions'];

  dataSource = new MatTableDataSource<{ nom: string; adresse: string; codePostal: string; ville: string; administrateur: Utilisateur | undefined }>();

  constructor(public dialog: MatDialog, private centreService: CentreService, private loginService: LoginService) {
    this.updateTable();
  }
  
  getLoginService() {
    return this.loginService;
  }

  updateTable() {
    this.centreService.getAllCentres().subscribe(resultCentres => {
      this.dataSource.data = this.mapCentres(resultCentres);
    })
  }

  mapCentres(resultCentres: Centre[]) {
    return resultCentres.map(centre => ({
      id: centre.id,
      nom: centre.nom,
      adresse: centre.adresse,
      codePostal: centre.codePostal,
      ville: centre.ville,
      administrateur: centre.administrateur
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
    const dialogRef = this.dialog.open(AddCenterDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }

  editCenter(center: any) {
    console.log('Editing center:', center);
    const dialogRef = this.dialog.open(UpdateCenterDialog, {
      width: '500px',
      disableClose: true,
      backdropClass: 'blur-background',
      panelClass: 'custom-dialog-container',
      data: center
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateTable();
    });
  }

  deleteCenter(center: any) {
    this.centreService.deleteCentre(center.id).subscribe({
      next: (c) => {
        console.log('Centre supprimé :', c);
        this.updateTable();
    }});
  }
}