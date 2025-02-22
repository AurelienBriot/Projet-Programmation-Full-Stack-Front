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

  getCreneauxByEstReserve(est_reserve: boolean) : Observable<Creneau[]> {
    return this.httpClient.get<Creneau[]>("/api/creneaux-reserves", {
     params: {
       "estReserve": est_reserve
     }
    });
   }

  addNewPatient(patient: Patient, creneau_id: number | undefined) : Observable<Creneau> {
      return this.httpClient.put<Creneau>(`/api/creneau/${creneau_id}/patient`, patient);
    
   }

  validerVaccination(creneau: Creneau) : Observable<Creneau> {
    return this.httpClient.get<Creneau>(`/api/creneau/${creneau.id}`, {
      params: {
        validerVac: 'true'
      }
    });
  } 

  deleteCreneau(creneau_id: number) : Observable<any> {
    return this.httpClient.delete<Creneau>(`/api/creneau/${creneau_id}`);
  }

  getAllCreneaux() : Observable<Creneau[]> {
    return this.httpClient.get<Creneau[]>("/api/tous-les-creneaux", {});
  }

  addCreneau(creneau: Creneau) : Observable<Creneau> {
    return this.httpClient.post<Creneau>("/api/creneau", creneau);
  }
  

}
