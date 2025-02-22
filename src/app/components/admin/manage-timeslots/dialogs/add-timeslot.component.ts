// --------------------------
// Fenêtre Ajouter un centre
// --------------------------

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Centre } from "app/interfaces/centre";
import { Creneau } from "app/interfaces/creneau";
import { Utilisateur } from "app/interfaces/utilisateur";
import { AppointmentService } from "app/services/appointment.service";
import { CentreService } from "app/services/centre.service";

@Component({
    selector: 'app-add-center-dialog',
    template: `
      <div class="dialog-content">
        <h2>Ajouter un Créneau</h2>
        <form #form="ngForm">
         
          <mat-form-field class="input">
              <mat-label for="date">Date du rendez-vous</mat-label>
              <input matInput [matDatepicker]="picker"
                id="date" 
                [(ngModel)]="newCreneau.date"
                name="date"
                required 
              />
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Heure</mat-label>
            <input matInput [(ngModel)]="newCreneau.heure" name="heure" required>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Minute</mat-label>
            <input matInput [(ngModel)]="newCreneau.minute" name="minute" required>
          </mat-form-field>
          
            <mat-form-field class="input">
              <mat-label for="creneau">Centre</mat-label>
              <mat-select [(ngModel)]="newCreneau.centre" name="centre"> 
                  <mat-option *ngFor="let centre of centres" [value]="centre">{{ centre.nom }}</mat-option>
              </mat-select>
              
            </mat-form-field>
          <div class="dialog-actions">
            <button mat-button (click)="onCancel()">Annuler</button>
            <button mat-flat-button color="primary" (click)="submit(form)">Ajouter</button>
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
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule]
  })
  
  export class AddCreneauDialog {
  
    newCreneau: Creneau = {date: new Date(), heure: 0, minute: 0, estReserve: false };
    
    centres : Centre[] = [];
  
    constructor(private creneauService: AppointmentService, private centreService: CentreService, public dialogRef: MatDialogRef<AddCreneauDialog>) {
      centreService.getAllCentres().subscribe(result => {
        this.centres = result;
      });
    }
  
    submit(form: any) {
      if (form.valid) {
        this.creneauService.addCreneau(this.newCreneau).subscribe({
          next: (creneau) => {
            console.log('Créneau ajouté :', creneau);
          }});
        this.dialogRef.close();
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  }