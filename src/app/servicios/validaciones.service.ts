import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  extensionesDeImagenesValidas( control: FormControl ): { [s:string]:boolean } {
    let extensionesPermitidas: string[] = ['.png', '.jpg', '.jpeg'];
    let extension = control.value?.substring(control.value.indexOf('.')).toLocaleLowerCase();

    let resultado = extensionesPermitidas.some(ext => ext === extension)
    if (!resultado){
      return { extensionesPermitidas: true }
    }
      return null;
    }
   


  validarExtensionImagen(imagen: string){

    console.log('Imagen', imagen)
    if (imagen === undefined) {
      return;
    }
    else{
      let extensionesPermitidas: string[] = ['.png', '.jpg', '.jpeg'];
      let extension = imagen?.substring(imagen.indexOf('.')).toLocaleLowerCase();
      return extensionesPermitidas.some(ext => ext == extension)
    }

  }
}
