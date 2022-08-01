import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanchaModel } from 'src/app/modelos/cancha.model';
import { CanchasService } from 'src/app/servicios/canchas.service';
import { ActivatedRoute } from '@angular/router';
import { DeportesService } from 'src/app/servicios/deportes.service';
import { TipoCanchaService } from 'src/app/servicios/tipo-cancha.service';
import { TipoCanchaModel } from 'src/app/modelos/tipoCancha.model';
import { TipoPisoService } from 'src/app/servicios/tipo-piso.service';
import { TipoPisoModel } from 'src/app/modelos/tipoPiso.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadoService } from 'src/app/servicios/estado.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-de-canchas',
  templateUrl: './gestion-de-canchas.component.html',
  styleUrls: ['./gestion-de-canchas.component.scss']
})
export class GestionDeCanchaComponent implements OnInit {

  
  //Paginación
  p: number = 1

  // Atributo para cambio de pagina
  accionABMC: string = 'C';
  misCanchas: boolean = false
  idComplejo: any;
  
  // Formulario para consultar las canchas del complejo
  formularioConsultarCancha!: FormGroup;
  
  // Datos para el formulario consultar canchas
  consultaPorPadel: boolean = false;
  todasLasCanchas: any[] = [];
  selectTipoCancha: any[] = []
  
  //Formulario modificar cancha
  formularioModificarCancha: FormGroup;
  
  // Formulario para registrar una cancha
  formularioRegistrarCancha!: FormGroup;
  
  // Datos para el formulario registrar una cancha
  seleccionaDeportePadel: boolean = true;
  deportes!: any[];
  tiposCancha!: TipoCanchaModel[];
  tiposPisos!: TipoPisoModel[];

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = true;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  constructor(private fb: FormBuilder,
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
      this.formularioConsultarCancha.controls['deporte'].setValue(0)
      this.formularioConsultarCancha.controls['tipoCancha'].setValue(0)
      // Realizo una carga de todas las canchas del complejo sin realizar filtros
      this.cargarCanchas()
  }


  cambiarPagina(accion: string){
    if (accion == 'C') {
      this.cargarCanchas()
    }
    this.accionABMC = accion;
    
  }

  cargarCanchas(){
    let id_complejo =  this.idComplejo
    this.formularioConsultarCancha.controls['deporte'].setValue(0)
    this.formularioConsultarCancha.controls['tipoCancha'].setValue(0)
    this.formularioConsultarCancha.controls['tipoCancha'].disable()
    this.canchasServices.getCanchas(id_complejo).subscribe(resp => {
      this.todasLasCanchas = resp.sort( (a: any, b:any) => a.numero_cancha - b.numero_cancha)
    })
    this.misCanchas = false
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
                                .sort( (a: any, b:any) => a.numero_cancha - b.numero_cancha)
        if (this.todasLasCanchas.length == 0) {
          Swal.fire({
            title: 'No hay canchas registradas para el deporte seleccionado',
            icon: 'info'
          })
          this.cargarCanchas()
          this.formularioConsultarCancha.controls['deporte'].reset()
          this.formularioConsultarCancha.controls['deporte'].setValue(0)
          this.formularioConsultarCancha.controls['tipoCancha'].disable()
          this.misCanchas = false
        }
        else{
          this.misCanchas = true;
        }
    })
  }
  
  consultarCanchasPorTipoDeCancha(event: any){
    let deporte = this.formularioConsultarCancha.value.deporte
    let tipoCancha = event.target.value;

    this.canchasServices.getCanchas(this.idComplejo).subscribe(resp => {
      this.todasLasCanchas = resp.filter(c => 
        c.tipoCancha.deporte.id_deporte == deporte &&
        c.tipoCancha.id_tipo_cancha == tipoCancha)
        .sort( (a: any, b:any) => a.numero_cancha - b.numero_cancha)
      
        if (this.todasLasCanchas.length == 0) {
          Swal.fire({
            title: 'No hay canchas registradas para el tipo de cancha seleccionado',
            icon: 'info'
          })
          this.cargarCanchas()
          this.formularioConsultarCancha.controls['tipoCancha'].reset()
          this.formularioConsultarCancha.controls['deporte'].reset()
          this.formularioConsultarCancha.controls['deporte'].setValue(0)
          this.formularioConsultarCancha.controls['tipoCancha'].setValue(0)
          this.formularioConsultarCancha.controls['tipoCancha'].disable()
          this.misCanchas = false
        }else{
          this.misCanchas = true
        }
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
      nroCancha   : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.min(1)]],
      deporte     : ['',  Validators.required],
      tipoCancha  : ['',  Validators.required],
      tipoPiso    : ['',  Validators.required],
      descripcion : ['',  Validators.required]
    });
  }

  // VALIDACIONES REGISTRAR CANCHA

  get nroCanchaNoValido(){
    return this.formularioRegistrarCancha.get('nroCancha')?.invalid && this.formularioRegistrarCancha.get('nroCancha')?.touched
    
  }
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

  registrarCancha(){

    if (this.formularioRegistrarCancha.invalid) {
      return Object.values(this.formularioRegistrarCancha.controls).forEach(control => {
        control.markAsTouched()
      });    
    }

    const {id} = this.idComplejo
    let datosFormularios: any = this.formularioRegistrarCancha.value;

    const {descripcion, nroCancha, tipoCancha, tipoPiso} = datosFormularios

    const cancha:CanchaModel = {
      complejo: {
        id_complejo: parseInt(id)
      },
      descripcion: descripcion,
      estadoCancha: {
        id_estado_cancha: 4
      },
      foto: null,
      numero_cancha: nroCancha,
      tipoCancha: {
        id_tipo_cancha: parseInt(tipoCancha)
      },
      tipoPiso: {
        id_tipo_piso: parseInt(tipoPiso)
      },
      id_cancha: null,
    }

    Swal.fire({
      title: 'Esta seguro de agregar una nueva cancha?',
      showDenyButton: true,
      confirmButtonText: 'Agregar cancha',
      denyButtonText: 'Cancelar'
    }).then((resolve) => {
      if(resolve.isConfirmed){
        this.canchasServices.registarCanchaRequest(cancha).subscribe(resp => {
          this.alertaService.notificacionRegistrarCancha(true)
          this.cambiarPagina('C')
          // resp ? this.alertaService.notificacionRegistrarCancha(resp) :
          // this.alertaService.notificacionRegistrarCancha(false)
        })
      }else{
        Swal.fire({
          title: 'Registración cancelada',
          icon: 'error'
        })
        this.cerrarModal()
        this.cambiarPagina('C')
      }
    })
    this.vaciarFormularioRegistrarCancha()
}

  vaciarFormularioRegistrarCancha(){
    let form = this.formularioRegistrarCancha
    form.reset()
    form.controls['tipoCancha'].disable()
    form.controls['tipoPiso'].disable()
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
    this.cargarDatosFormModificarCancha(cancha)
  }
  
  
  cargarDatosFormModificarCancha(cancha:any){
    this.formularioModificarCancha.controls['nroCancha'].reset(cancha.numero_cancha)
    this.formularioModificarCancha.controls['descripcion'].reset(cancha.descripcion)
    this.formularioModificarCancha.controls['idTipoCancha'].setValue(cancha.tipoCancha.id_tipo_cancha)
    this.formularioModificarCancha.controls['id_tipo_piso'].setValue(cancha.tipoPiso.id_tipo_piso)
    this.formularioModificarCancha.controls['idEstado'].setValue(cancha.estadoCancha.id_estado_cancha)
  }

  cerrarModal(){
    this.modal.dismissAll()
    this.cargarCanchas()
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

    const {idTipoCancha, nroCancha, descripcion, id_tipo_piso, idEstado} = this.formularioModificarCancha.value
    const cancha: CanchaModel = {
      complejo: {id_complejo: parseInt(this.idComplejo.id)},
      id_cancha: canchaAnterior.id_cancha,
      numero_cancha: nroCancha,
      descripcion: descripcion == '' || null ?  canchaAnterior.descripcion : descripcion,
      foto: null,
      tipoCancha: {id_tipo_cancha: idTipoCancha == '' || idTipoCancha == null ? canchaAnterior.tipoCancha.id_tipo_cancha : idTipoCancha },
      tipoPiso: {id_tipo_piso: id_tipo_piso == '' || id_tipo_piso == null ? canchaAnterior.tipoPiso.id_tipo_piso : id_tipo_piso},
      estadoCancha: {id_estado_cancha: idEstado == '' || idEstado == null ? canchaAnterior.estadoCancha.id_estado_cancha : idEstado}
    }

    Swal.fire({
      title: "Esta seguro que desea modificar la cancha?",
      showDenyButton: true, 
      confirmButtonText: 'Modificar cancha',
      denyButtonText: 'Cancelar'
    }).then((resolve) => {
      if(resolve.isConfirmed){
        this.canchasServices.modicarCanchaRequest(cancha).subscribe(resp => {
          // this.alertaService.notificacionModificarCancha(resp)
          this.cerrarModal()
        })
        Swal.fire({
          title: "Cancha modificada",
          icon: 'success'
        })
      }
      else{
        Swal.fire({
          title: 'Modificación cancelada',
          icon: 'error'
        })
        this.cerrarModal()
      }
    })


  }

  eliminarCancha(idCancha: any){
    Swal.fire({
      title: "Esta seguro que desea eliminar esta cancha?",
      showDenyButton: true,
      confirmButtonText: "Eliminar cancha",
      denyButtonText: "Cancelar"
    }).then((resultado) => {
      
      if(resultado.isConfirmed){
        this.canchasServices.eliminarCanchaRequest(idCancha).subscribe(resp => {
          Swal.close()
          this.cargarCanchas()
        })
        Swal.fire({
          title: "Cancha eliminada",
          icon: 'success'
        }) 
      }
      else{
        Swal.fire({
          title: "Eliminación cancelada",
          icon: 'error'
        })
      }
    })
  }
}
