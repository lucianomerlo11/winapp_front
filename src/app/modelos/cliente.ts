import { Perfil } from "./perfil";
import { Usuario } from "./usuario";

export class Cliente {
    public apellido: string;
    public email: string;
    public esJugador: boolean;
    public esActivo: boolean;
    public fecha_alta: Date;
    public fecha_baja: Date | null;
    public id_usuario: string;
    public perfil: Perfil;
    public fecha_nacimiento: Date;
    public nombre: string;
    public numero_documento: string | null;
    public telefono: string;
    public tipo_documento: {
        id_tipo_documento: number,
        nombre: string | null
    };
}
