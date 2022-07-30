import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoPisoModel } from '../modelos/tipoPiso.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoPisoService {

  url: string = 'https://winapprest.herokuapp.com/tipopiso'
  constructor(private http: HttpClient) { }

  getTiposDePiso(){
      return this.http.get(`${this.url}/getall`)
        .pipe(
          map(this.crearArregloTipoPiso)
        )
  }


  crearArregloTipoPiso(objTipoPiso: TipoPisoModel){
    const tiposDePisos: TipoPisoModel[] = []

    if(objTipoPiso === null) {return []}
    
    Object.keys(objTipoPiso).forEach(key => {
      const tipoPiso: TipoPisoModel = objTipoPiso[key];
      tiposDePisos.push(tipoPiso)
    })

    return tiposDePisos;
  }
}
