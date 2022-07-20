import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-complejo',
  templateUrl: './gestion-complejo.component.html',
  styleUrls: ['./gestion-complejo.component.scss'],
})
export class GestionComplejoComponent implements OnInit {
  
  public formRegistrarComplejo !: FormGroup;
  public formDatosGenerales !: FormGroup;
  public formDatosDireccion !: FormGroup;
  public formDatosFacturacion !: FormGroup;
  public formDatosFacilidades !: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    //datos generales 
    const datosGenerales = {
      nombreComplejo: ['', 
    [
      Validators.required
    ]]
    }
    this.formDatosGenerales = this.formBuilder.group(datosGenerales)

    //datos de domicilio
    const datosDireccion = {
      nombreCalle: ['pedro',[
        Validators.required
      ]],
      numCalle: ['43', [
        Validators.required
      ]],
      cp: ['12',[
        Validators.required
      ]],
      dpto: ['cordoba',[
        Validators.required
      ]],
      barrio: ['urca',[
        Validators.required
      ]],
    }
    this.formDatosDireccion = this.formBuilder.group(datosDireccion)
    
    //datos facturacion 
    const datosFacturacion = {}
    this.formDatosFacturacion = this.formBuilder.group(datosFacturacion)

    //datos Facilidades
    const datosFacilidades = {
      buffet: [false],
      mesas: [false],
      parrillas: [false],
      banos: [false],
      duchas: [false],
    }
    this.formDatosFacilidades = this.formBuilder.group(datosFacilidades)

    //formulario completo
    this.formRegistrarComplejo = this.formBuilder.group({
      nombreComplejo: ['',[
        Validators.required
      ]],
      nombreCalle: ['',[
        Validators.required
      ]],
      numCalle: ['',[
        Validators.required
      ]],
      cp: ['',[
        Validators.required
      ]],
      dpto: ['',[
        Validators.required
      ]],
      barrio: ['',[
        Validators.required
      ]],
      buffet: [false],
      mesas: [false],
      parrillas: [false],
      banos: [false],
      duchas: [false],
    })

  }
  send(): any {
    this.formRegistrarComplejo.value
  }
}
