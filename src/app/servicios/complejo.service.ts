import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComplejoModel } from '../modelos/complejo.model';
import Swal from 'sweetalert2';

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

  getComplejosByDeporte( deporte: string ){
    return this.httpClient.get(this.url + '/complejo/getbydeporte/' + deporte)
  }

  getComplejos(){
    return this.httpClient.get(this.url + '/complejo/getall')
  }

  guardarDatosComplejo( objetoComplejo: any ){
    return this.httpClient.post(this.url + 'nombreEndPoint',{})
  }

  pushComplejoAdd(complejo: ComplejoModel){
    return this.httpClient.post(this.url + '/complejo/add/', complejo)
  }

  putComplejoRemove(id_complejo: number){
    return this.httpClient.put(this.url + '/complejo/remove/' + id_complejo, id_complejo);
  }

  putComplejoUpload(complejo: any){
    return this.httpClient.put(this.url + '/complejo/update/', complejo)
  }
}
