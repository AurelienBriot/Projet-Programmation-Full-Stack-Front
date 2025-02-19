import { Creneau } from "./creneau"

export interface Patient {
    id?: number,
    nom: string,
    prenom: string,
    adresse: string,
    ville: string,
    email: string,
    telephone: string,
    estVaccine: boolean
    creneau?: Creneau
}
