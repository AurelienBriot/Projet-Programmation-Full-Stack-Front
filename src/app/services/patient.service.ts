import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creneau } from 'app/interfaces/creneau';
import { Patient } from 'app/interfaces/patient';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  createPatient(patient: Patient) : Observable<Patient> {
        return this.httpClient.post<Patient>("/api/patient", patient);
  }
}
