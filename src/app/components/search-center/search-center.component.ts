import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { CentreService } from 'app/services/centre.service';

@Component({
  selector: 'app-search-center',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './search-center.component.html',
  styleUrls: ['./search-center.component.scss'],
})
export class SearchCenterComponent {
  city: string = ''; // Ville saisie par l'utilisateur

  // Liste complète des centres

  // Liste des centres filtrés
  filteredCenters: { id?: number, nom: string; adresse: string; codePostal: string, ville: string }[] = [];

  constructor(private service: CentreService, private router: Router) {}

  filterCenters() {
    this.service.
    getAllCentresByVille(this.city).subscribe(resultCentres => {
      this.filteredCenters = resultCentres;
    })
  }

  chooseCenter(center: any) {
    this.router.navigate(['/appointment'], { state: { center } });
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
