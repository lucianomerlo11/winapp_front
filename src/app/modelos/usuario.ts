import { Perfil } from "./perfil";

export class Usuario {
    public esActivo: boolean;
    public fecha_alta: Date;
    public fecha_baja: Date | null;
    public id_usuario: string;
    public perfil: Perfil;
}
