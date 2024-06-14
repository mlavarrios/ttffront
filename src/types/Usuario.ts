export interface Usuario {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    contrasenia: string;
    celular: string;
    rol: number;
    foto: string | null;
    cv: string | null;
    id_usuario: number;
    rol_nombre: string;
}