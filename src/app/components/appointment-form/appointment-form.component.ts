import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-appointment-form',
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule], 
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})

export class AppointmentFormComponent {
  selectedCenter: { name: string; address: string } | null = null; // Défaut à null
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    date: '',
    time: ''
  };
  constructor(private router: Router) {
    this.selectedCenter = history.state.center || null;
  }
  submit(form: any) {
    if (form.valid) {
      // Redirection vers la page de confirmation si le formulaire est valide
      this.router.navigate(['/confirmation']);
    }
  }
}
