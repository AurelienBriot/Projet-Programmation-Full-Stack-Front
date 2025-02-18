import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, timeout } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.isLogged().pipe(
      timeout(1000), 
      map(isLogged => {
        if (isLogged) {
          console.log("User is logged");
          return true;
        } else {
          console.log("User is not logged");
          return this.router.parseUrl('/login');
        }
      }),
      catchError((error) => {
        console.error('Error during authentication check', error);
        this.router.navigate(['/login']);
        return of(false); 
      })
    );
  }

}

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const isAdmin = localStorage.getItem('isAdmin') === 'true';
//     if (!isAdmin) {
//       this.router.navigate(['/']);
//       return false;
//     }
//     return true;
//   }
// }
