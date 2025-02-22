import { Centre } from "./centre"
import { Patient } from "./patient"

export interface Creneau {
    id: number,
    date: Date,
    heure: number,
    minute: number,
    patient?: Patient
    centre?: Centre
}
