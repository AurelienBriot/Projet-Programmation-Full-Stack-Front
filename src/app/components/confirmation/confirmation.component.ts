import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(private router: Router) {}

  makeNewReservation() {
    this.router.navigate(['/search']); // Redirection vers la page Search Center
  }
}