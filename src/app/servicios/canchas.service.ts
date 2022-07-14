import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanchasService {

  canchas: any[] = [
    {
      idCancha    : '1',
      deporte     : 'FUTBOL',
      tipoCancha  : 'FUTBOL 5',
      tipoPiso    : 'CESPED SINTETICO',
      estado      : 'DISPONIBLE',
      fotos       : ['FOTO 1', 'FOTO 2'] 
    },
    {
      idCancha    : '2',
      deporte     : 'FUTBOL',
      tipoCancha  : 'FUTBOL 7',
      tipoPiso    : 'CESPED SINTETICO',
      estado      : 'DISPONIBLE',
      fotos       : ['FOTO 1', 'FOTO 2'] 
    },
    {
      idCancha    : '3',
      deporte     : 'BASQUET',
      tipoCancha  : 'BASQUET 5',
      tipoPiso    : 'PARQUET',
      estado      : 'DISPONIBLE',
      fotos       : ['FOTO 1', 'FOTO 2'] 
    }
  ]

  constructor() { }

  getDeportes(){
    return ['FUTBOL', 'BASQUET', 'PADEL']
  }

  getTipoCancha(deporte: string){
    return deporte == 'FUTBOL'  ? ['FUTBOL 5', 'FUTBOL 7', 'FUTBOL 9', 'FUTBOL 11'] :
           deporte == 'BASQUET' ? ['BASQUET 3', 'BASQUET 4','BASQUET 5'] : 
           ['SIN SELECCION']
  }

  getTipoPiso(deporte: string){
    return deporte == 'FUTBOL'  ? ['CESPED SINTETICO', 'CESPED NATURAL'] :
           deporte == 'BASQUET' ? ['MOSAICO', 'PARQUET']  : 
           ['CESPED SINTETICO', 'CEMENTO', 'POLVO DE LADRILLO', 'MARMOL']
  }

  getCanchas(){
    return this.canchas
  }
  
  getCanchasPorDeporte(deporte: string){
    let canchasDelDeporte: any[];
    canchasDelDeporte = this.canchas.filter(cancha => cancha.deporte == deporte)
    return canchasDelDeporte;
  }

  getCanchasPorDeporteYTipoCancha(deporte: string, tipoCancha: string){
    return this.canchas.filter(cancha => cancha.deporte == deporte.toLocaleUpperCase() && 
                               cancha.tipoCancha == tipoCancha.toLocaleUpperCase())
  }
}
