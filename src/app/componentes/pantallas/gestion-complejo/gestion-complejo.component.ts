import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ValidacionesService } from 'src/app/servicios/validaciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeportesService } from 'src/app/servicios/deportes.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ComplejoModel } from 'src/app/modelos/complejo.model';
import { ComplejoService } from 'src/app/servicios/complejo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-complejo',
  templateUrl: './gestion-complejo.component.html',
  styleUrls: ['./gestion-complejo.component.scss'],
})
export class GestionComplejoComponent implements OnInit {
  
  // Formulario para registrar complejo
  formRegistrarComplejo !: FormGroup;
  // Formulario para consultar complejo
  formConsultarComplejo!: FormGroup;
  //Formulario modificar complejo
  formModificarComplejo!: FormGroup;
  //Formulario eliminar complejo
  formEliminarComplejo!: FormGroup;

  // Atributo para cambio de pagina
  accionABMC: string = 'C';
  idDuenio: any;

  // Datos para el formulario consultar canchas
  todosLosComplejos: any;
  consultarCancha(){}

  // Datos para el formulario registrar una cancha
  deportes!: any[];

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor(private formBuilder: FormBuilder,
              private imagenesServices: ImagenesService,
              private validarExtension: ValidacionesService,
              private deportesServices: DeportesService,
              private alertaService: AlertasService,
              private estadoService: EstadoService,
              private modal: NgbModal,
              private complejoServices: ComplejoService,
              private router: ActivatedRoute,
              private route: Router)
     {
    this.router.params.subscribe(parametro => {
      this.idDuenio = parametro
    })
    // Creo el formulario para registrar una cancha
    this.crearFormularioRegistrarComplejo()
    // Creo que el formulario para consultar una cancha
    this.crearFormularioConsultarComplejo()
    // Creo el formulario para modificar una cancha
    this.crearFormularioModificarComplejo()
  }

  ngOnInit(): void {
    // BreadCrumb
    this.breadCrumbItems = [
      { label: 'Gestion' },
      { label: 'Complejos', active: true }
    ];
    // Realizo la carga del select para la selección de deportes
    this.deportesServices.getDeportes().subscribe(resp => {
        
      this.deportes = resp
    })
    // Realizo una carga de todas las canchas del complejo sin realizar filtros
    this.complejoServices.getComplejos().subscribe(resp => {
      this.todosLosComplejos = resp
    })

    
  }
  cambiarPagina(accion: string){
    this.accionABMC = accion;
  }

  //formulario registrar complejo
  crearFormularioRegistrarComplejo(){
    this.formRegistrarComplejo = this.formBuilder.group({
      nombreComplejo: ['',[
        Validators.required
      ]],
      domicilio: ['',[
        Validators.required
      ]],
      tiene_buffet: [false],
      tiene_mesas: [false],
      tiene_parrillas: [false],
      tiene_banios: [false],
      tiene_duchas: [false],
      tiene_estacionamiento: [false]
    });
  }

  
  registrarComplejo(){

    if (this.formRegistrarComplejo.invalid) {
      return Object.values(this.formRegistrarComplejo.controls).forEach(control => {
        control.markAsTouched()
      });    
    }

    const {id} = this.idDuenio
    let datosFormularios: any = this.formRegistrarComplejo.value;

    const {
      domicilio,
      nombreComplejo,
      tiene_banios,
      tiene_buffet,
      tiene_duchas,
      tiene_estacionamiento, 
      tiene_mesas,
      tiene_parrillas
    } = datosFormularios

    const complejo:ComplejoModel = {
      domicilio: domicilio,
      duenio: {id_duenio: 1},
      esActivo: true,
      id_complejo: null,
      imagen: null,
      nombre: nombreComplejo,
      tiene_banios: tiene_banios,
      tiene_buffet: tiene_buffet,
      tiene_duchas: tiene_duchas,
      tiene_estacionamiento: tiene_estacionamiento,
      tiene_mesas: tiene_mesas,
      tiene_parrillas: tiene_parrillas,
    }
    
    this.complejoServices.pushComplejoAdd(complejo).subscribe(resp => {
      resp ? this.alertaService.notificacionRegistrarComplejo(true) :
      this.alertaService.notificacionRegistrarComplejo(false)
    })
    this.vaciarFormularioRegistrarComplejo()
    
}
vaciarFormularioRegistrarComplejo(){
  this.formRegistrarComplejo.reset()
}



// REALIZA LA CREACION DEL FORMULARIO PARA MODIFICAR COMPLEJO
crearFormularioConsultarComplejo(){
  this.formConsultarComplejo = this.formBuilder.group({
    deporte   : ['', Validators.required]
  })
}

consultarComplejoPorDeporte(event: any){
    
  let deporte = event.target.value
  if(deporte){
    this.complejoServices.getComplejosByDeporte(deporte).subscribe(resp => {
      this.todosLosComplejos = resp
    })
  }else{
    this.complejoServices.getComplejos().subscribe(resp => {
      this.todosLosComplejos = resp
    })
  }
  
}
  send(): any {
    this.formRegistrarComplejo.value
  }

  vaciarFormularioRegistrarCancha(){
    this.formRegistrarComplejo.reset()
  }
 

  //MODALS

  cerrarModal(){
    this.modal.dismissAll()
    this.complejoServices.getComplejos().subscribe(resp => {
      this.todosLosComplejos = resp
    })
  }

  abrirModalModificar(contenido: any, complejo: any){
    this.modal.open(contenido)
    this.cargarDatosComplejo(complejo)
  }
  
  cargarDatosComplejo(complejo: any){
    this.formModificarComplejo.controls['nombre'].reset(complejo.nombre)
    this.formModificarComplejo.controls['domicilio'].reset(complejo.domicilio)
    this.formModificarComplejo.controls['tiene_buffet'].reset(complejo.tiene_buffet)
    this.formModificarComplejo.controls['tiene_mesas'].reset(complejo.tiene_mesas)
    this.formModificarComplejo.controls['tiene_parrillas'].reset(complejo.tiene_parrillas)
    this.formModificarComplejo.controls['tiene_duchas'].reset(complejo.tiene_duchas)
    this.formModificarComplejo.controls['tiene_banios'].reset(complejo.tiene_banios)
    this.formModificarComplejo.controls['tiene_estacionamiento'].reset(complejo.tiene_estacionamiento)
  }

  //Eliminar Complejo
  eliminarComplejo(id_complejo: number){
    Swal.fire({  
      title: 'Esta seguro que desea eliminar el complejo?',  
      showDenyButton: true,  
      confirmButtonText: `Eliminar Complejo`,  
      denyButtonText: `Cancelar`,
    }).then((result) => {  
      
      if (result.isConfirmed) {    
        Swal.fire({
          title:'El Complejo fue eliminado con exito.',
          icon: 'success',
          showConfirmButton:false
        });
        this.complejoServices.putComplejoRemove(id_complejo).subscribe((resp: any )=> {
          window.setTimeout(function(){window.location.reload()},1000)
        })
      } else if (result.isDenied) {    
          Swal.fire('Los datos no han sido guardados.', '', 'info')
       }
      
    })
    
    
  }

  // Detalle row complejo
  rowclickhandler(detalle:any, complejo: any){
    console.log(detalle)
    this.modal.open(detalle)
    const nombreComplejo = document.getElementById('nombreDetalleComplejo') as HTMLInputElement
    nombreComplejo.value = complejo.nombre
    
    const domicilioComplejo = document.getElementById('domicilioDetalleComplejo') as HTMLInputElement
    domicilioComplejo.value = complejo.domicilio

    const buffetComplejo = document.getElementById('buffetDetalleComplejo') as HTMLInputElement
    buffetComplejo.checked = complejo.tiene_buffet

    const mesasComplejo = document.getElementById('mesasDetalleComplejo') as HTMLInputElement
    mesasComplejo.checked = complejo.tiene_mesas

    const baniosComplejo = document.getElementById('baniosDetalleComplejo') as HTMLInputElement
    baniosComplejo.checked = complejo.tiene_banios

    const parrillasComplejo = document.getElementById('parrillasDetalleComplejo') as HTMLInputElement
    parrillasComplejo.checked = complejo.tiene_parrillas

    const duchasComplejo = document.getElementById('duchasDetalleComplejo') as HTMLInputElement
    duchasComplejo.checked = complejo.tiene_duchas

    const estacionamientoComplejo = document.getElementById('estacionamientoDetalleComplejo') as HTMLInputElement
    estacionamientoComplejo.checked = complejo.tiene_duchas
  }


   // REALIZA LA CREACION DEL FORMULARIO PARA MODIFICAR COMPLEJO
   crearFormularioModificarComplejo(){
    this.formModificarComplejo = this.formBuilder.group({
      nombre: ['', [
        Validators.required
      ]],
      domicilio: ['',[
        Validators.required
      ]],
      imagen: null,
      tiene_buffet: [false],
      tiene_mesas: [false],
      tiene_parrillas: [false],
      tiene_banios: [false],
      tiene_duchas: [false],
      tiene_estacionamiento: [false],
      
    })
  }
  // MODIFICAR COMPLEJO

  modificarComplejo(complejoAnterior: any){
    console.log(this.formModificarComplejo.value)

    const {nombre ,imagen, domicilio, tiene_buffet, tiene_mesas, tiene_parrillas, tiene_banios, tiene_duchas, tiene_estacionamiento} = this.formModificarComplejo.value
    
    const complejo: ComplejoModel = {
      id_complejo: complejoAnterior.id_complejo,
      nombre: nombre,
      domicilio: domicilio,
      imagen: null,
      tiene_buffet: tiene_buffet,
      tiene_mesas: tiene_mesas,
      tiene_parrillas: tiene_parrillas,
      tiene_banios: tiene_banios,
      tiene_duchas: tiene_duchas,
      tiene_estacionamiento: tiene_estacionamiento,
      duenio:{
        id_duenio: 1
      },
      esActivo: true 
    }

    this.complejoServices.putComplejoUpload(complejo).subscribe(resp => {
      console.log(resp)
      this.alertaService.notificacionModificarComplejo(resp)
      this.cerrarModal()
    })
  }

  verCanchas(complejo: any){
    this.cerrarModal()
    this.route.navigate(['/ag/mis-canchas',complejo.id_complejo])
  }
}
