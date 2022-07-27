import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ComplejoService } from './complejo.service';
@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  notificacionRegistrarCancha(resultadoRegistracion){
    Swal.fire({
      icon: resultadoRegistracion == true ? 'success' : 'error',
      title: resultadoRegistracion == true ? 'Excelente !!' : 'Oops...',
      text: resultadoRegistracion == true ? 'Tu cancha se ha registrado con exito' : 'Hubo un error al intentar registrar tu cancha, intentalo mas tarde',
    })
  }

  notificacionModificarCancha(resultadoMoficacionCancha){
    Swal.fire({
      icon :  resultadoMoficacionCancha == true ? 'success' : 'error',
      title: resultadoMoficacionCancha  == true ? 'Excelente !!' : 'Oops...',
      text :  resultadoMoficacionCancha == true ? 'Tu cancha se ha modificado con exito' : 'Hubo un error al intentar modificar tu cancha, intentalo mas tarde',
    })
  }

  notificacionRegistrarComplejo(resultadoRegistracion){
    Swal.fire({
      icon: 'success',
      title: 'Tu Complejo se registro con exito.',
      showConfirmButton: false,
    })
    window.setTimeout(function(){window.location.reload()},1000)
    
  }

  notificacionModificarComplejo(resultadoMoficacionComplejo){
    Swal.fire({
      icon : 'success',
      title: 'El Complejo se modifico con exito.',
      showConfirmButton:false
    })
    window.setTimeout(function(){window.location.reload()},1000)
  }
  
  
}
