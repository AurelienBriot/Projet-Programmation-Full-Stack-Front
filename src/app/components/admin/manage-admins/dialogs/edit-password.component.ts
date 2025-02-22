// --------------------------
// Fenêtre Modifier un mot de passe
// --------------------------

import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Utilisateur } from "app/interfaces/utilisateur";
import { UtilisateurService } from "app/services/utilisateur.service";

@Component({
    selector: 'app-edit-pwd-admin-dialog',
    template: `
      <div class="dialog-content">
        <h2>Changer le mot de passe</h2>
        <form #form="ngForm" class="fixed-form">
  
          <mat-form-field appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input matInput type="password" [(ngModel)]="updatedUtilisateur.password" name="password" required>
          </mat-form-field>
  
          <div class="dialog-actions">
            <button mat-button (click)="onCancel()">Annuler</button>
            <button mat-flat-button color="primary" (click)="submit(form)">Modifier</button>
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
  
  export class UpdatePasswordAdminDialog {
  
    updatedUtilisateur : Utilisateur = { nom: "", prenom: "", adresse: "", ville: "", telephone: "", role: "ADMIN", email: "", login: "", password: "" };
  
    constructor(private utilisateurService: UtilisateurService, public dialogRef: MatDialogRef<UpdatePasswordAdminDialog>, @Inject(MAT_DIALOG_DATA) public admin: any) {
      this.updatedUtilisateur.id = admin.id;
      this.updatedUtilisateur.role = admin.role;
    }
  
    submit(form: any) {
      if (form.valid) {
        this.utilisateurService.updatePasswordAdmin(this.updatedUtilisateur).subscribe({
          next: (utilisateur) => {
            console.log('Utilisateur mis à jour :', utilisateur);
          }});
        this.dialogRef.close();
      }
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }
  
  }