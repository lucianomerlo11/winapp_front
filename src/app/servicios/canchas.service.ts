import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CanchaModel } from '../modelos/cancha.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  constructor(private http: HttpClient) { }



  getCanchas(idComplejo: any){
    const {id} = idComplejo
    return this.http.get(`http://localhost:8080/cancha/getbycomplejo/${id}`)
      .pipe(
        map( resp => this.crearArregloCanchas(resp) )
      )
  }

  crearArregloCanchas(canchasObj: object){
    const canchas: CanchaModel[] = []

    if (canchasObj === null) {return [];}

    Object.keys(canchasObj).forEach(key => {
      const cancha: CanchaModel = canchasObj[key];
      canchas.push(cancha)
    })

    return canchas
  }



  registarCanchaRequest(cancha: CanchaModel){
    return this.http.post('http://localhost:8080/cancha/add', cancha)
  }

}
