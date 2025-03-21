import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  
  constructor(private router: Router, private loginService: LoginService) {}

  navigateTo(page: string) {
    if (page === 'search') {
      this.router.navigate([`/${page}`]); 
    } else {
      this.router.navigate([`/admin/${page}`]); 
    }
  }

  logout() {
    this.loginService.logout();
  }

  getLoginService() {
    return this.loginService;
  }
}
