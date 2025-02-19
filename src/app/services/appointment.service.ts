import { HttpClient } from '@angular/common/http';
import { booleanAttribute, Injectable } from '@angular/core';
import { Creneau } from '../interfaces/creneau';
import { Observable } from 'rxjs/internal/Observable';
import { Patient } from 'app/interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  getCreneauxByCentreAndDateAndEstReserve(centre_id: number, date: string, est_reserve: boolean) : Observable<Creneau[]> {
    return this.httpClient.get<Creneau[]>("/api/creneaux", {
     params: {
       "centre": centre_id,
       "date": date,
       "estReserve": est_reserve
     }
    });
   }

   addNewPatient(patient: Patient, creneau_id: number) : Observable<Creneau> {
      return this.httpClient.put<Creneau>(`/api/creneau/${creneau_id}/patient`, patient);
    
   }
}
