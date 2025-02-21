import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-timeslots',
  standalone: true,
  imports: [MatFormField, MatLabel, MatTable, MatInput],
  templateUrl: './manage-timeslots.component.html',
  styleUrl: './manage-timeslots.component.scss'
})
export class ManageTimeslotsComponent {
  searchQuery: string = '';

  centers = [
    { name: 'CHU Lyon', address: '1 Rue de l\'Hôpital, 69000 Lyon' },
    { name: 'Clinique Pasteur', address: '12 Rue Pasteur, 75015 Paris' },
  ];

  filteredCenters = [...this.centers];

  filterData() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCenters = this.centers.filter(
      (center) =>
        center.name.toLowerCase().includes(query) ||
        center.address.toLowerCase().includes(query)
    );
  }

  addCenter() {
    const newCenter = { name: 'Nouveau Centre', address: 'Adresse Inconnue' };
    this.centers.push(newCenter);
    this.filterData(); // Refresh filtered list
    alert('Nouveau centre ajouté !');
  }

  editCenter(center: any) {
    alert(`Modifier le centre: ${center.name}`);
  }

  deleteCenter(center: any) {
    if (confirm(`Voulez-vous supprimer ${center.name} ?`)) {
      this.centers = this.centers.filter((c) => c !== center);
      this.filterData(); // Refresh filtered list
    }
  }
}
