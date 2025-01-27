import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-search-center',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search-center.component.html',
  styleUrls: ['./search-center.component.scss'],
})
export class SearchCenterComponent {
  city: string = ''; // Ville saisie par l'utilisateur

  // Liste complète des centres
  centers: { name: string; address: string; city: string }[] = [
    { name: 'CH Narbonne', address: 'Boulevard Dr Lacroix, 11100 Narbonne', city: 'Narbonne' },
    { name: 'Nancy - Tour Marcel Brot', address: '1, Rue Joseph Cugnot, 54000 Nancy', city: 'Nancy' },
    { name: 'Centre Lyon Part-Dieu', address: 'Place Charles Béraudier, 69003 Lyon', city: 'Lyon' },
    { name: 'CHU Bordeaux', address: 'Rue Dubernat, 33400 Bordeaux', city: 'Bordeaux' },
  ];

  // Liste des centres filtrés
  filteredCenters: { name: string; address: string; city: string }[] = [];

  constructor(private router: Router) {}

  // Filtrer les centres par ville
  filterCenters() {
    this.filteredCenters = this.centers.filter((center) =>
      center.city.toLowerCase().includes(this.city.toLowerCase())
    );
  }
  chooseCenter(center: any) {
    this.router.navigate(['/appointment'], { state: { center } });
  }
}
