import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CanchaModel } from '../modelos/cancha.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  url: string = 'https://winapprest.herokuapp.com/cancha'
  constructor(private http: HttpClient) { }



  getCanchas(idComplejo: any){
    const {id} = idComplejo
    return this.http.get(`${this.url}/getbycomplejo/${id}`)
      .pipe(
        map( resp => this.crearArregloCanchas(resp) )
      )
  }

  crearArregloCanchas(canchasObj: object){
    const canchas: any[] = []

    if (canchasObj === null) {return [];}

    Object.keys(canchasObj).forEach(key => {
      const cancha: any = canchasObj[key];
      canchas.push(cancha)
    })

    return canchas
  }



  registarCanchaRequest(cancha: CanchaModel){
    return this.http.post(`${this.url}/add`, cancha)
  }

  modicarCanchaRequest(cancha: any){
    return this.http.put(`${this.url}/update`, cancha)
  }

  eliminarCanchaRequest(idCancha: any){
    let id = parseInt(idCancha)
    return this.http.delete(`${this.url}/remove/${id}`)
  }

}
