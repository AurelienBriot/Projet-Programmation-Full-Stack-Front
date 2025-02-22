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

  getAllPatients() : Observable<Patient[]> {
    return this.httpClient.get<Patient[]>("/api/patients", {});
  }

  getAllPatientsByNom(searchQuery: string) : Observable<Patient[]> {
    return this.httpClient.get<Patient[]>("/api/patients", {
      params: {
        nom: searchQuery
      }
    });
  }

  validerVaccination(patient: Patient) : Observable<Patient> { 
    return this.httpClient.get<Patient>(`/api/patient/${patient.id}`, {
      params: {
        estVaccine: 'true'
      }
    });
  }

  deletePatient(patient_id: number) : Observable<any> {
    return this.httpClient.delete<Patient>(`/api/patient/${patient_id}`);
  }

}
