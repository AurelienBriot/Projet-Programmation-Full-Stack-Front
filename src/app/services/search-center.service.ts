import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centre } from '../interfaces/centre';

@Injectable({
  providedIn: 'root'
})
export class SearchCenterService {

  constructor(private httpClient: HttpClient) { }

  getAllCenters(ville: string) : Observable<Centre[]> {
   return this.httpClient.get<Centre[]>("/api/centres", {
    params: {
      "ville": ville
    }
   });
  }

}
