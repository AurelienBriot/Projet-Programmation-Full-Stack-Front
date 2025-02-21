// --------------------------
// Fenêtre Modifier un super admin
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
    selector: 'app-edit-super-admin-dialog',
    template: `
      <div class="dialog-content">
        <h2>Modifier un Super Admin</h2>
        <form #form="ngForm" class="fixed-form">
  
          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.nom" name="nom" required>
          </mat-form-field>
  
          <mat-form-field appearance="outline">
            <mat-label>Prénom</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.prenom" name="prenom" required>
          </mat-form-field>
  
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.email" name="email" required>
          </mat-form-field>
  
          <mat-form-field appearance="outline">
            <mat-label>Téléphone</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.telephone" name="telephone" required>
          </mat-form-field>
  
          <mat-form-field appearance="outline">
            <mat-label>Adresse</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.adresse" name="adresse" required>
          </mat-form-field>
  
          <mat-form-field appearance="outline">
            <mat-label>Ville</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.ville" name="ville" required>
          </mat-form-field>
  
          <mat-form-field appearance="outline">
            <mat-label>Login</mat-label>
            <input matInput [(ngModel)]="updatedUtilisateur.login" name="login" required>
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
  
  export class UpdateSuperAdminDialog {
  
    updatedUtilisateur : Utilisateur = { nom: "", prenom: "", adresse: "", ville: "", telephone: "", role: "SUPERADMIN", email: "", login: "", password: "" };
  
    constructor(private utilisateurService: UtilisateurService, public dialogRef: MatDialogRef<UpdateSuperAdminDialog>, @Inject(MAT_DIALOG_DATA) public superAdmin: any) {
      this.updatedUtilisateur = { ...superAdmin };
    }
  
    submit(form: any) {
      if (form.valid) {
        this.utilisateurService.updateSuperAdmin(this.updatedUtilisateur).subscribe({
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