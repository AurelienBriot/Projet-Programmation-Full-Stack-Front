import { Utilisateur } from "./utilisateur";

export interface Centre {
    id?: number,
    nom: string,
    adresse: string,
    codePostal: string,
    ville: string,
    medecins?: Utilisateur[],
    administrateur?: Utilisateur
}
