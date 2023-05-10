import { Venta } from "./ventas";

export interface Usuario {
    idField?:string;
    id?: number;
    uuid?: string;
    email?: string;
    password?: string;
    nombre?: string;
    avatar?: string;
    adm?: boolean;
    cliente?: boolean;
    organizador?: boolean;
    fotografo?: boolean;
    telefono?: string;
    fotos?: string[];
    ventas?: Venta[];
    disponible?: boolean;
    phoneToken?:string;
    rol?:string;
}
