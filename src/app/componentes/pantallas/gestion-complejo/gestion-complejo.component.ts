import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-complejo',
  templateUrl: './gestion-complejo.component.html',
  styleUrls: ['./gestion-complejo.component.scss'],
})
export class GestionComplejoComponent implements OnInit {
  
  // Formulario para registrar complejo
  public formRegistrarComplejo !: FormGroup;
  // Formulario para consultar complejo
  formConsultarCancha!: FormGroup;
  //Formulario modificar complejo
  formModificarComplejo!: FormGroup;

  // Atributo para cambio de pagina
  accionABMC: string = 'A';

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

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

  
  cambiarPagina(accion: string){
    this.accionABMC = accion;
  }
}
