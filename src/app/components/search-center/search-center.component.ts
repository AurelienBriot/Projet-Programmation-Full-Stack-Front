import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-center',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './search-center.component.html',
  styleUrls: ['./search-center.component.scss'],
})
export class SearchCenterComponent {
  city: string = '';
  centers = [
    { name: 'Nancy - Tour Marcel Brot', address: '1, Rue Joseph Cugnot, 54000 Nancy' },
    { name: 'Lyon - Centre Médical', address: '10, Rue de la République, 69001 Lyon' },
  ];
  filteredCenters: any[] = [];
  searchPerformed: boolean = false; 

  constructor(private router: Router) {}

  filterCenters() {
    const query = this.city.trim().toLowerCase();
    this.searchPerformed = query.length > 0; 
    this.filteredCenters = query
      ? this.centers.filter((center) => center.name.toLowerCase().includes(query))
      : [];
  }

  chooseCenter(center: any) {
    localStorage.setItem('selectedCenter', JSON.stringify(center));
    this.router.navigate(['/appointment']); 
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
