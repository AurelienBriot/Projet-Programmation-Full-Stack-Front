import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utilisateur } from '../interfaces/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private password?: string;
  private username?: string;

  private role: string = "";

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  connect(username: string, password: string): Observable<any> {
    let token = this.createToken(username, password);
    
    let options = {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    };

    return this.httpClient.post<string>('/api/login', null, options).pipe(map(value => {
      // this.password = password;
      // this.username = username;
      console.log("Connected");
      this.isLoggedSubject.next(true);
      this.loadUserRoles();
     
    }))
  }

  private createToken(username?: string, password?: string) {
    let token = `Basic ` + btoa(`${username}:${password}`);
    return token;
  } 

  private loadUserRoles() {
    this.httpClient.get<{ username: string, roles: string[] }>('/api/me').subscribe(response => {
      this.role = response.roles[0];
      console.log("Role : ", this.role);
      sessionStorage.setItem('role', JSON.stringify(this.role));
    });
  }

  hasRole(roleToTest: string): boolean {
    return this.role === roleToTest;
  }

  isLogged(): Observable<boolean> {
    console.log(this.isLoggedSubject.asObservable());
    return this.isLoggedSubject.asObservable();
  }

  getBasicAuthHeaderValue(): string {
    return this.createToken(this.username, this.password)
  }

  authHasBasic(): boolean {
    return !!this.password && !!this.username;
  }

  logout() {
    console.log("Logout")
    if (this.authHasBasic()) {
      this.password = undefined;
      this.username = undefined;
    } 
    
    this.isLoggedSubject.next(false);

    this.role = "";
    sessionStorage.removeItem('role');

    this.httpClient.post('/api/logout', {}).subscribe(() => {
      document.cookie = 'JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
      window.location.reload();
    });
  }

}