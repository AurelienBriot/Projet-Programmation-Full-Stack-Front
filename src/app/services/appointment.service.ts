import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creneau } from '../creneau';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  getCreneauxByCentreAndDate(centre_id: number, date: string) : Observable<Creneau[]> {
    return this.httpClient.get<Creneau[]>("/api/public/creneaux", {
     params: {
       "centre": centre_id,
       "date": date
     }
    });
   }
}
