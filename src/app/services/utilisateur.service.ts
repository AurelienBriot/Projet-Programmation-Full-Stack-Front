import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from 'app/interfaces/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  
  constructor(private httpClient: HttpClient) { }

  getAllSuperAdmins() : Observable<Utilisateur[]> {
     return this.httpClient.get<Utilisateur[]>("/api/super-admins", {});
    }

  getAllSuperAdminsByNom(searchQuery: string) : Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>("/api/super-admins", {
      params: {
        nom: searchQuery
      }
    });

  }

  getAllAdmins() : Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>("/api/admins", {});
  }

  getAllAdminsByNom(searchQuery: string) {
    return this.httpClient.get<Utilisateur[]>("/api/admins", {
      params: {
        nom: searchQuery
      }
    });
  }
  
  getAllMedecins() : Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>("/api/medecins", {});
  }

  getAllMedecinsByNom(searchQuery: string) {
    return this.httpClient.get<Utilisateur[]>("/api/medecins", {
      params: {
        nom: searchQuery
      }
    });
  }


  addSuperAdmin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>("/api/super-admin", utilisateur);
  }

  addAdmin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>("/api/admin", utilisateur);
  }

  addMedecin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>("/api/medecin", utilisateur);
  }

  updateSuperAdmin(utilisateur: Utilisateur) : Observable<Utilisateur> {
      return this.httpClient.put<Utilisateur>(`/api/super-admin/${utilisateur.id}`, utilisateur);
  }

  updateAdmin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`/api/admin/${utilisateur.id}`, utilisateur);
  }

  updateMedecin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`/api/medecin/${utilisateur.id}`, utilisateur);
  }

  updatePasswordSuperAdmin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`/api/super-admin/${utilisateur.id}/password`, utilisateur);
  }

  updatePasswordAdmin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`/api/admin/${utilisateur.id}/password`, utilisateur);
  }

  updatePasswordMedecin(utilisateur: Utilisateur) : Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`/api/medecin/${utilisateur.id}/password`, utilisateur);
  }

  deleteUtilisateur(id: number) : Observable<any> {
    return this.httpClient.delete(`/api/utilisateur/${id}`);
  }
 
}
