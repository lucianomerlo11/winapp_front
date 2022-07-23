import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = "http://localhost:8080/";
  constructor(private httpClient: HttpClient) { }

  getUsuarioById(IdUsuario: number){
    const params: any = { IdUsuario };
    return this.httpClient.get(this.url + "usuario/getbyid/" + IdUsuario);
  }
}
