import { Hospital } from "./hospital.models";
import { Usuario } from "./usuario.model";

export class Medico {
    _id: string;
    nombre: string;
    apellido: string;
    img: string;
    usuario: Usuario;
    hospital: Hospital;
}