import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-centers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './manage-centers.component.html',
  styleUrls: ['./manage-centers.component.scss'],
})
export class ManageCentersComponent {
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
