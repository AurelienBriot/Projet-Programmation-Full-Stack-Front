import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  constructor(private router: Router) {}

  makeNewReservation() {
    this.router.navigate(['/search']); // Redirection vers la page Search Center
  }
}