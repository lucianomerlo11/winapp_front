import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DeporteModel } from '../modelos/deporte.model';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  url: string = 'https://winapprest.herokuapp.com/deporte'
  constructor(private http: HttpClient) { }

  getDeportes(){
    return this.http.get(`${this.url}/getall`)
      .pipe(
        map(resp => this.crearArregloDeportes(resp))
      )
  }

  crearArregloDeportes(deporteObj: object){
    const deportes: DeporteModel[] = []

    if (deporteObj === null) {return [];}

    Object.keys(deporteObj).forEach(key => {
      const deporte: DeporteModel = deporteObj[key];
      deportes.push(deporte)
    })

    return deportes
  }
}
