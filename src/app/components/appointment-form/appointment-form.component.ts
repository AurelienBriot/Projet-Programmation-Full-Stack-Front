import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  standalone: true, // Composant autonome
  imports: [CommonModule, FormsModule], 
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
