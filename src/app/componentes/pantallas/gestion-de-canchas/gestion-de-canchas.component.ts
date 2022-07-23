import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanchaModel } from 'src/app/modelos/cancha.model';
import { CanchasService } from 'src/app/servicios/canchas.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ValidacionesService } from 'src/app/servicios/validaciones.service';
import { ActivatedRoute } from '@angular/router';
import { DeportesService } from 'src/app/servicios/deportes.service';
import { TipoCanchaService } from 'src/app/servicios/tipo-cancha.service';
import { TipoCanchaModel } from 'src/app/modelos/tipoCancha.model';
import { TipoPisoService } from 'src/app/servicios/tipo-piso.service';
import { TipoPisoModel } from 'src/app/modelos/tipoPiso.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoService } from 'src/app/servicios/estado.service';


@Component({
  selector: 'app-gestion-de-canchas',
  templateUrl: './gestion-de-canchas.component.html',
  styleUrls: ['./gestion-de-canchas.component.scss']
})
export class GestionDeCanchaComponent implements OnInit {

  
  // Atributo para cambio de pagina
  accionABMC: string = 'C';

  idComplejo: any;
  
  // Formulario para consultar las canchas del complejo
  formularioConsultarCancha!: FormGroup;
  
  // Datos para el formulario consultar canchas
  consultaPorPadel: boolean = false;
  todasLasCanchas: any[] = [];
  selectTipoCancha: any[] = []
  consultarCancha(){}
  
  //Formulario modificar cancha
  formularioModificarCancha: FormGroup;
  
  // Formulario para registrar una cancha
  formularioRegistrarCancha!: FormGroup;
  
  // Datos para el formulario registrar una cancha
  seleccionaDeportePadel: boolean = true;
  deportes!: any[];
  tiposCancha!: TipoCanchaModel[];
  tiposPisos!: TipoPisoModel[];

  //Atributos para trabajar con imagenes
  public archivos: string[] = []; 
  public previzualizacion!: string;

  constructor(private fb: FormBuilder,
              private imagenesServices: ImagenesService,
              private validarExtension: ValidacionesService,
              private canchasServices: CanchasService,
              private deportesServices: DeportesService,
              private tiposCanchasServices: TipoCanchaService,
              private tiposPisosServices: TipoPisoService,
              private alertaService: AlertasService,
              private estadoService: EstadoService,
              private modal: NgbModal,
              private router: ActivatedRoute) { 
                
            this.router.params.subscribe(parametro => {
              this.idComplejo = parametro
            })

            // Creo que el formulario para consultar una cancha
            this.crearFormularioConsultarCancha()
            // Creo el formulario para registrar una cancha
            this.crearFormularioRegistrarCancha()
            // Creo el formulario para modificar una cancha
            this.crearFormularioModificarCancha()
            
            // Deshabilito el select para seleccionar un tipo de cancha en la consulta
            this.formularioConsultarCancha.controls['tipoCancha'].disable()
            //Deshabilito los selects de tipo de cancha y tipo de piso cuando se renderiza el formulario
            this.formularioRegistrarCancha.controls['tipoCancha'].disable()
            this.formularioRegistrarCancha.controls['tipoPiso'].disable()
              
  }
  
  ngOnInit(): void {
      // Realizo la carga del select para la selección de deportes
      this.deportesServices.getDeportes().subscribe(resp => {
        
        this.deportes = resp
      })
      // Realizo una carga de todas las canchas del complejo sin realizar filtros
      this.canchasServices.getCanchas(this.idComplejo).subscribe(resp => {
        this.todasLasCanchas = resp
        console.log(this.todasLasCanchas)
      })
  }


  cambiarPagina(accion: string){
    this.accionABMC = accion;
  }

  /**
   * ***************LOGICA PARA CONSULRAR UNA CANCHA**********************************
   */

  consultarCanchasPorDeporte(event: any){
    
    let deporte = event.target.value
    deporte == 0 ? this.formularioConsultarCancha.controls['tipoCancha'].disable() :
    this.formularioConsultarCancha.controls['tipoCancha'].enable()
    
    this.tiposCanchasServices.getTipoCanchaByDeporte(deporte).subscribe(resp =>{
      this.selectTipoCancha = resp
    })


    this.canchasServices.getCanchas(this.idComplejo).subscribe(resp => {
        this.todasLasCanchas = resp.filter(c => c.tipoCancha.deporte.id_deporte == deporte)
    })
  }
  
  consultarCanchasPorTipoDeCancha(event: any){
    let deporte = this.formularioConsultarCancha.value.deporte
    let tipoCancha = event.target.value;

    this.canchasServices.getCanchas(this.idComplejo).subscribe(resp => {
      this.todasLasCanchas = resp.filter(c => 
        c.tipoCancha.deporte.id_deporte == deporte &&
        c.tipoCancha.id_tipo_cancha == tipoCancha)
    })
  }

  // REALIZA LA CREACION DEL FORMULARIO PARA CONSULTAR CANCHAS
  crearFormularioConsultarCancha(){
    this.formularioConsultarCancha = this.fb.group({
      deporte   : ['', Validators.required],
      tipoCancha: ['', Validators.required]
    })
  }

  /**
   * ***************LOGICA PARA REGISTRAR UNA CANCHA****************************
   */
  
  getTiposCanchas(event:any){
    let deporteSeleccionado = event.target.value;
    if(deporteSeleccionado == 0) {
      this.formularioRegistrarCancha.controls['tipoCancha'].disable()
    } 
    else{
      this.formularioRegistrarCancha.controls['tipoCancha'].enable()
    }
    this.formularioRegistrarCancha.controls['tipoPiso'].enable()
    this.tiposCanchasServices.getTipoCanchaByDeporte(deporteSeleccionado).subscribe(resp => {
        this.tiposCancha = resp	
    }) 
    
    this.tiposPisosServices.getTiposDePiso().subscribe(resp => {     
      this.tiposPisos = resp
    })
    
  }
  
  // REALIZA LA CREACION DEL FORMULARIO PARA CREAR CANCHAS
  crearFormularioRegistrarCancha(){
    this.formularioRegistrarCancha = this.fb.group({
      deporte     : ['', Validators.required],
      tipoCancha  : ['', Validators.required],
      tipoPiso    : ['', Validators.required],
      descripcion : ['', Validators.required],
      fotos       : ['', [Validators.required, this.validarExtension.extensionesDeImagenesValidas]],
    });
  }

  // VALIDACIONES REGISTRAR CANCHA

  get deporteNoValido(){
      return this.formularioRegistrarCancha.get('deporte')?.invalid && this.formularioRegistrarCancha.get('deporte')?.touched
    }

    get tipoDeCanchaNoValida(){
      return this.formularioRegistrarCancha.get('tipoCancha')?.invalid && this.formularioRegistrarCancha.get('tipoCancha')?.touched
    }

    get tipoDePisoNoValido(){
      return this.formularioRegistrarCancha.get('tipoPiso')?.invalid && this.formularioRegistrarCancha.get('tipoPiso')?.touched
    }
    
    get descripcionNoValida(){
      return this.formularioRegistrarCancha.get('descripcion')?.invalid && this.formularioRegistrarCancha.get('descripcion')?.touched
    }

    get fotosNoValidas(){
      return this.formularioRegistrarCancha.get('fotos')?.invalid && this.formularioRegistrarCancha.get('fotos')?.touched
    }

  registrarCancha(){

    if (this.formularioRegistrarCancha.invalid) {
      return Object.values(this.formularioRegistrarCancha.controls).forEach(control => {
        control.markAsTouched()
      });    
    }

    const {id} = this.idComplejo
    let datosFormularios: any = this.formularioRegistrarCancha.value;

    const {descripcion, fotos, tipoCancha, tipoPiso} = datosFormularios

    const cancha:CanchaModel = {
      id_cancha: null,
      descripcion: descripcion,
      foto: null,
      tipoCancha: {id_tipo_cancha: parseInt(tipoCancha)},
      tipoPiso: {id_tipo_piso: parseInt(tipoPiso)},
      estadoCancha: {id_estado_cancha: 1},
      complejo: {id_complejo: id},
      esActivo: true
    }
    
    this.canchasServices.registarCanchaRequest(cancha).subscribe(resp => {
      resp ? this.alertaService.notificacionRegistrarCancha(resp) :
      this.alertaService.notificacionRegistrarCancha(false)
    })
    this.vaciarFormularioRegistrarCancha()
}

  vaciarFormularioRegistrarCancha(){
    this.formularioRegistrarCancha.reset()
    this.archivos = []
  }

  /**
   * Logica para obtener y visualizar imagen
   **/

  capturarImagen(event:any): any{
    const archivoCapturado = event.target.files[0];
    if(this.validarExtension.validarExtensionImagen(archivoCapturado?.name) == false){
      return;
    }
    else{
        this.imagenesServices.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previzualizacion = imagen.base;
        this.archivos.push(imagen.base)
      }) 
    }
  }

  // ESTE METODO SE ENCARGA DE ELIMINAR CADA IMAGEN QUE SE HA SELECCIONADO
  eliminarImagen(imagen: number){
    this.archivos.splice(imagen, 1)
  }

  /**
   * Logica para modificar una cancha
   */

  todosTiposDeCancha: any[] = []
  todosTiposDePiso: any[] = []
  estadosCanchas: any[] = []

  abrirModal(contenido: any, cancha: any){
    this.modal.open(contenido)
    this.getTodosTiposDeCancha()
    this.getTodosTiposPiso()
    this.getEstadosCancha()
    this.formularioModificarCancha.controls['nroCancha'].disable()
    this.formularioModificarCancha.controls['nroCancha'].reset(cancha.id_cancha)
    this.formularioModificarCancha.controls['descripcion'].reset(cancha.descripcion)
  }

  cerrarModal(){
    this.modal.dismissAll()
    this.canchasServices.getCanchas(this.idComplejo).subscribe(resp => {
      this.todasLasCanchas = resp
    })
  }

  crearFormularioModificarCancha(){
    this.formularioModificarCancha = this.fb.group({
      nroCancha     : [''],
      descripcion   : [''],
      idTipoCancha  : [''],
      id_tipo_piso  : [''],
      idEstado      : ['']
    })
  }

  getTodosTiposDeCancha(){
    this.tiposCanchasServices.getTiposDeCancha().subscribe(resp => {
      this.todosTiposDeCancha = resp
    })
  }

  getTodosTiposPiso(){
    this.tiposPisosServices.getTiposDePiso().subscribe(resp => {
      this.todosTiposDePiso = resp
    })
  }

  getEstadosCancha(){
    this.estadoService.getEstadosCancha().subscribe(resp => {
      this.estadosCanchas = resp
    })
  }

  modificarCancha(canchaAnterior: any){
    console.log(this.formularioModificarCancha.value)

    const {idTipoCancha, descripcion, id_tipo_piso, idEstado} = this.formularioModificarCancha.value
    console.log(id_tipo_piso)
    const cancha: CanchaModel = {
      id_cancha: canchaAnterior.id_cancha,
      descripcion: descripcion == '' || null ?  canchaAnterior.descripcion : descripcion,
      foto: null,
      tipoCancha: {id_tipo_cancha: idTipoCancha == '' || idTipoCancha == null ? canchaAnterior.tipoCancha.id_tipo_cancha : idTipoCancha },
      tipoPiso: {id_tipo_piso: id_tipo_piso == '' || id_tipo_piso == null ? canchaAnterior.tipoPiso.id_tipo_piso : id_tipo_piso},
      estadoCancha: {id_estado_cancha: idEstado == '' || idEstado == null ? canchaAnterior.estadoCancha.id_estado_cancha : idEstado},
      complejo: {id_complejo: parseInt(this.idComplejo.id)},
      esActivo: true 
    }

    this.canchasServices.modicarCanchaRequest(cancha).subscribe(resp => {
      this.alertaService.notificacionModificarCancha(resp)
      this.cerrarModal()
    })

  }

}
