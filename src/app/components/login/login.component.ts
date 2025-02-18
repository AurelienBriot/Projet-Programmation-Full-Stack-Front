import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }


  connect(): void {
    this.loginService.connect(this.username, this.password).subscribe(value => {
      this.router.navigate(["/admin/centers"])
    });
  }

}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms'; 

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private router: Router) {}

//   login() {
//     if (this.username === 'admin' && this.password === 'admin') {
//       localStorage.setItem('isAdmin', 'true');
//       this.router.navigate(['/admin']); 
//     } else {
//       alert('Nom d’utilisateur ou mot de passe incorrect');
//     }
//   }
//   goToSearch() {
//     this.router.navigate(['/search']); 
//   }
// }





