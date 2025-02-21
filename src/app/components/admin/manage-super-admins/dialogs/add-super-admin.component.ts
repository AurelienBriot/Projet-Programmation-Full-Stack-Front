// --------------------------
// Fenêtre Ajouter un super admin
// --------------------------

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Utilisateur } from "app/interfaces/utilisateur";
import { UtilisateurService } from "app/services/utilisateur.service";

@Component({
  selector: 'app-add-super-admin-dialog',
  template: `
    <div class="dialog-content">
      <h2>Ajouter un Super Admin</h2>
      <form #form="ngForm" class="fixed-form">

        <mat-form-field appearance="outline">
          <mat-label>Nom</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.nom" name="nom" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Prénom</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.prenom" name="prenom" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.email" name="email" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Téléphone</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.telephone" name="telephone" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Adresse</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.adresse" name="adresse" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Ville</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.ville" name="ville" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Login</mat-label>
          <input matInput [(ngModel)]="newUtilisateur.login" name="login" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Mot de passe</mat-label>
          <input matInput type="password" [(ngModel)]="newUtilisateur.password" name="password" required>
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

export class AddSuperAdminDialog {

  newUtilisateur : Utilisateur = { nom: "", prenom: "", adresse: "", ville: "", telephone: "", role: "SUPERADMIN", email: "", login: "", password: "" };

  constructor(private utilisateurService: UtilisateurService, public dialogRef: MatDialogRef<AddSuperAdminDialog>) {

  }

  submit(form: any) {
    if (form.valid) {
      this.utilisateurService.addSuperAdmin(this.newUtilisateur).subscribe({
        next: (utilisateur) => {
          console.log('Utilisateur ajouté :', utilisateur);
        }});
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}