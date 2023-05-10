export interface AccesToken {
    uid: string;
    email?:     string;
    nombre?:    string;
    avatar?:    string;
    adm?:       boolean;
    cliente?:   boolean;
    organizador?:   boolean;
    fotografo?: boolean;
    disponible?: boolean;
    fotos?: string[];
}
