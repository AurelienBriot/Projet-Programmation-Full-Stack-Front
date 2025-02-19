import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centre } from '../interfaces/centre';

@Injectable({
  providedIn: 'root'
})
export class CentreService {

  constructor(private httpClient: HttpClient) { }

  
  getAllCentresByVille(ville: string) : Observable<Centre[]> {
   return this.httpClient.get<Centre[]>("/api/centres", {
    params: {
      "ville": ville
    }
   });
  }

  getAllCentres() : Observable<Centre[]> {
    return this.httpClient.get<Centre[]>("/api/centres", {
    });
  }

  addCentre(centre: Centre) : Observable<Centre> {
    return this.httpClient.post<Centre>("/api/centre", centre);
  }

}
