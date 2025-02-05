import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-my-center',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './my-center.component.html',
  styleUrls: ['./my-center.component.scss']
})
export class MyCenterComponent {
  searchTerm: string = '';
  selectedDoctor: any = { name: '', email: '', center: '' };

  centers = [
    { id: 1, name: 'Nancy - Tour Marcel Brot' },
    { id: 2, name: 'CHU Lyon' },
    { id: 3, name: 'Clinique Pasteur' }
  ];

  doctors = [
    { name: 'Dr. Dupont', email: 'dupont@example.com', center: 'Nancy - Tour Marcel Brot' },
    { name: 'Dr. Martin', email: 'martin@example.com', center: 'CHU Lyon' }
  ];

  filteredDoctors = [...this.doctors];

  addDoctor() {
    if (this.selectedDoctor.name && this.selectedDoctor.email && this.selectedDoctor.center) {
      this.doctors.push({ ...this.selectedDoctor });
      this.filteredDoctors = [...this.doctors];
      this.selectedDoctor = { name: '', email: '', center: '' };
    }
  }

  filterDoctors() {
    const query = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) || doctor.email.toLowerCase().includes(query)
    );
  }
}
