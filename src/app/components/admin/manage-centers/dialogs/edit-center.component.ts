// --------------------------
// Fenêtre Modifier un centre
// --------------------------

import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Centre } from "app/interfaces/centre";
import { CentreService } from "app/services/centre.service";
import { AddCenterDialog } from "./add-center.component";

@Component({
    selector: 'app-add-center-dialog',
    template: `
      <div class="dialog-content">
        <h2>Modifier un Centre</h2>
        <form #form="ngForm" (ngSubmit)="submit(form)">
          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput [(ngModel)]="updatedCentre.nom" name="nom" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Adresse</mat-label>
            <input matInput [(ngModel)]="updatedCentre.adresse" name="adresse" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Code postal</mat-label>
            <input matInput [(ngModel)]="updatedCentre.codePostal" name="codePostal" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Ville</mat-label>
            <input matInput [(ngModel)]="updatedCentre.ville" name="ville" required>
          </mat-form-field>
          <div class="dialog-actions">
            <button mat-button (click)="onCancel()">Annuler</button>
            <button mat-flat-button color="primary">Modifier</button>
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
  export class UpdateCenterDialog {
  
    updatedCentre : Centre = { id: 0, nom: "", adresse: "", codePostal: "", ville: "" };
  
    constructor(private centreService: CentreService, public dialogRef: MatDialogRef<AddCenterDialog>, @Inject(MAT_DIALOG_DATA) public centre: any) {
      this.updatedCentre = { ...centre };
    }
  
    submit(form: any) {
      if (form.valid) {
        this.centreService.updateCentre(this.updatedCentre).subscribe({
          next: (c) => {
            console.log('Centre modifié :', c);
          }});
        this.dialogRef.close();
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  }
  