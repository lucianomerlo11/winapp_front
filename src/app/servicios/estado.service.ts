import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
 
  url: string = 'https://winapprest.herokuapp.com/estadocancha'
  constructor(private http: HttpClient) { }

  getEstadosCancha(){
    return this.http.get(`${this.url}/getall`).pipe(
      map(this.crearArregloEstado)
    )
  }

  crearArregloEstado(objEstado: any){
    const estadosCancha: any[] = []

    if(objEstado === null) {return []}
    
    Object.keys(objEstado).forEach(key => {
      const estadoCancha: any = objEstado[key];
      estadosCancha.push(estadoCancha)
    })

    return estadosCancha;
  }
}
