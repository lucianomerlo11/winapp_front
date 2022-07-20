import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ComplejoService {
  
  url: string= 'http://localhost:8080';

  constructor( private httpClient: HttpClient) { 

  }

  getDatos( idComplejo: number ){
    return this.httpClient.get(this.url + 'nombreEndPoint' + idComplejo)
  }

  getComplejos(){
    return this.httpClient.get(this.url + 'nombreEndPoint')
  }

  guardarDatosComplejo( objetoComplejo: any ){
    return this.httpClient.post(this.url + 'nombreEndPoint',{})
  }
}
