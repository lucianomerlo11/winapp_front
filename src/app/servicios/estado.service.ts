import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  getEstadosCancha(){
    return this.http.get('http://localhost:8080/estadocancha/getall').pipe(
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
