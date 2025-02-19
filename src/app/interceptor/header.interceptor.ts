import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'app/services/login.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  private publicGetEndpoints = [
    "/api/centres",
    "/api/creneaux",
    "/api/creneau"
  ]

  private publicPostEndpoints = [
    "/api/patient",
    "/api/validerCreneauPatient"
  ]

  private publicPutEndpoints = [
    "/api/patient/"
  ]

  constructor(private loginService: LoginService) {
  }

  private isPublicGetEndpoint(url: string): boolean {
    return this.publicGetEndpoints.some(publicUrl => url.startsWith(publicUrl));
  }

  private isPublicPostEndpoint(url: string): boolean {
    return this.publicPostEndpoints.some(publicUrl => url.startsWith(publicUrl));
  }

  private isPublicPutEndpoint(url: string): boolean {
    return this.publicPostEndpoints.some(publicUrl => url.startsWith(publicUrl));
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.substring(0, 4) === "/api") {
      if(!this.isPublicGetEndpoint(httpRequest.url) || !this.isPublicPostEndpoint(httpRequest.url) || !this.isPublicPutEndpoint(httpRequest.url)) {
        console.log("Is Api request")
        let headers: any = {
        'x-requested-with': 'XMLHttpRequest',
        'Content-type': 'application/json',
        'Accept': 'application/json'
        }

        if (!httpRequest.headers.has('Authorization') && this.loginService.authHasBasic()) {
          headers['Authorization'] = this.loginService.getBasicAuthHeaderValue()
        } 

        return next.handle(httpRequest.clone({setHeaders: headers}));
      }

    }
    return next.handle(httpRequest);
  }
}