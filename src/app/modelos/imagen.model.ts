export class Imagen{
    public archivo: File;
    public nombreArchivo: any;
    public url: string;
    public estaSubiendo: boolean;
    public progreso: number

    constructor(archivo: File){
        this.archivo = archivo;
        this.nombreArchivo. archivo.name;
        this.progreso = 0;
        this.estaSubiendo = false
    }
}