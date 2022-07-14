import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  validarExtensionImagen(imagen: string){
    let extensionesPermitidas: string[] = ['.png', '.jpg', '.jpeg'];

    let extension = imagen.substring(imagen.indexOf('.')).toLocaleLowerCase();

    return extensionesPermitidas.some(ext => ext == extension)
  }
}
