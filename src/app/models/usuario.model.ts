export class Usuario {
    uid: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    img: string;
    role: string;
    google: boolean;
}

export class LoginRequestDTO {
    email: string;
    password: string;
}