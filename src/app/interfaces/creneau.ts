import { Centre } from "./centre"
import { Patient } from "./patient"

export interface Creneau {
    estReserve: boolean,
    id?: number,
    date: Date,
    heure: number,
    minute: number,
    patient?: Patient
    centre?: Centre
}
