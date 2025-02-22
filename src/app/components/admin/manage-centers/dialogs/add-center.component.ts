// --------------------------
// Fenêtre Ajouter un centre
// --------------------------

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Centre } from "app/interfaces/centre";
import { Utilisateur } from "app/interfaces/utilisateur";
import { CentreService } from "app/services/centre.service";
import { UtilisateurService } from "app/services/utilisateur.service";

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
          <mat-form-field class="input">
            <mat-label for="centre">Administrateur</mat-label>
            <mat-select [(ngModel)]="newCentre.administrateur" name="centre" required> 
                <mat-option *ngFor="let utilisateur of utilisateurs" [value]="utilisateur">{{ utilisateur.nom }} {{ utilisateur.prenom }}</mat-option>
            </mat-select>
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
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule]
  })
  
  export class AddCenterDialog {
  
    newCentre : Centre = { nom: "", adresse: "", codePostal: "", ville: ""};
    
    utilisateurs : Utilisateur[] = [];
  
    constructor(private centreService: CentreService, private utilisateurService: UtilisateurService, public dialogRef: MatDialogRef<AddCenterDialog>) {
      utilisateurService.getAllAdmins().subscribe(resultAdmins => {
        this.utilisateurs = resultAdmins;
      });
    }
  
    submit(form: any) {
      if (form.valid) {
        this.centreService.addCentre(this.newCentre).subscribe({
          next: (centre) => {
            console.log('Centre ajouté :', centre);
          }});
        this.dialogRef.close();
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  }