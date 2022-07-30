import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoCanchaModel } from '../modelos/tipoCancha.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoCanchaService {

  url: string = 'https://winapprest.herokuapp.com/tipocancha'
  constructor(private http: HttpClient) { }

  getTipoCanchaByDeporte(idDeporte){
    return this.http.get(`${this.url}/getbydeporte/${idDeporte}`)
      .pipe(
        map(resp => this.crearArregloTiposCancha(resp))
      )
  }

  getTiposDeCancha(){
    return this.http.get(`${this.url}/getall`)
    .pipe(
      map(resp => this.crearArregloTiposCancha(resp))
    )
  }

  
  crearArregloTiposCancha(tipoCanchaObj: object){
    const tiposDeCancha: TipoCanchaModel[] = []

    if (tipoCanchaObj === null) {return [];}

    Object.keys(tipoCanchaObj).forEach(key => {
      const tipoCancha: TipoCanchaModel = tipoCanchaObj[key];
      tiposDeCancha.push(tipoCancha)
    })

    return tiposDeCancha
  }
}
