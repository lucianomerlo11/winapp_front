import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = "https://winapprest.herokuapp.com/";
  constructor(private httpClient: HttpClient) { }

  getUsuarioById(IdUsuario: any){
    let id = IdUsuario;
    return this.httpClient.get(this.url + `cliente/getbyusuarioid/${id}`);
  }

  guardarUsuarioCliente(Cliente: Cliente) {
    return this.httpClient.post(this.url + "signin/add", Cliente);
  }

  setupPantalla() {
    return this.httpClient.get(this.url + "tipodocumento/getall");
  }
}
