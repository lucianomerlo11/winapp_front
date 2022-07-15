import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { CanchaModel } from 'src/app/modelos/cancha.model';
import { CanchasService } from 'src/app/servicios/canchas.service';
import { ImagenesService } from 'src/app/servicios/imagenes.service';
import { ValidacionesService } from 'src/app/servicios/validaciones.service';

@Component({
  selector: 'app-gestion-de-canchas',
  templateUrl: './gestion-de-canchas.component.html',
  styleUrls: ['./gestion-de-canchas.component.scss']
})
export class GestionDeCanchaComponent implements OnInit {

  
  // Atributo para cambio de pagina
  accionABMC: string = 'C';


  
  // Formulario para consultar las canchas del complejo
  formularioConsultarCancha!: FormGroup;
  
  // Datos para el formulario consultar canchas
  consultaPorPadel: boolean = false;
  todasLasCanchas: any[] = [];
  selectTipoCancha: any[] = []
  consultarCancha(){}
  
  
  // Formulario para registrar una cancha
  formularioRegistrarCancha!: FormGroup;
  
  // Datos para el formulario registrar una cancha
  seleccionaDeportePadel: boolean = true;
  cancha = new CanchaModel();
  deportes!: string[];
  tiposDeportes!: string[];
  tiposPisos!: string[];

  //Atributos para trabajar con imagenes
  public archivos: string[] = []; 
  public previzualizacion!: string;

  constructor(private fb: FormBuilder,
              private imagenesServices: ImagenesService,
              private validarExtension: ValidacionesService,
              private canchasServices: CanchasService) { 
                
                // Creo que el formulario para consultar una cancha
              this.crearFormularioConsultarCancha()

              // Creo el formulario para registrar una cancha
              this.crearFormularioRegistrarCancha()
              
              // Desabilito el select para seleccionar un tipo de cancha en la consulta
              this.formularioConsultarCancha.controls['tipoCancha'].disable()

              //Desabilito los selects de tipo de cancha y tipo de piso cuando se renderiza el formulario
              this.formularioRegistrarCancha.controls['tipoCancha'].disable()
              this.formularioRegistrarCancha.controls['tipoPiso'].disable()
              
  }
  
  ngOnInit(): void {
      // Realizo la carga del select para la selección de deportes
      this.deportes = this.canchasServices.getDeportes();
      // Realizo una carga de todas las canchas del complejo sin realizar filtros
      this.todasLasCanchas = this.canchasServices.getCanchas()
  }

  /**
   * Este metodo realiza un cambio de pagina de acuerdo a la accion que se quiera realizar
   * Si accion == A, se habilita el formulario para registrar una cancha
   * Si accion == C, se habilita el fomrulario para consultar las canchas
   */
  cambiarPagina(accion: string){
    this.accionABMC = accion;
  }

  /**
   * ***************LOGICA PARA CONSULRAR UNA CANCHA**********************************
   */
  
  /**
   * METODO UTILIZADO PARA LA CONSULTA DE CANCHAS
   * 
   * Este metodo realiza la consulta de las canchas por deporte de acuerdo a la seleccion
   * del select por deporte, tambien desactiva el select de tipo de cancha si el deporte
   * es PADEL
   * 
   * CAMBIAR NOMBRE DEL METODO
   */

  obtenerDeporteParaConsultar(event: any){
    let deporte = event.target.value
    deporte == 'PADEL' || deporte == 0 ? this.formularioConsultarCancha.controls['tipoCancha'].disable() :
    this.formularioConsultarCancha.controls['tipoCancha'].enable()
    this.selectTipoCancha = this.canchasServices.getTipoCancha(deporte) 
    this.todasLasCanchas = this.canchasServices.getCanchasPorDeporte(deporte)
  }
  
  consultarCanchasPorDeporteYTipoCancha(event: any){
    let deporte = this.formularioConsultarCancha.value.deporte
    let tipoCancha = event.target.value;
    
    tipoCancha == 0 ? this.todasLasCanchas = this.canchasServices.getCanchasPorDeporte(deporte) :
    this.todasLasCanchas = this.canchasServices.getCanchasPorDeporteYTipoCancha(deporte, tipoCancha)
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
  

  /**
   * METODO UTILIZADO PARA LA REGISTRACION DE CANCHAS
   * 
   * Este metodo realiza la carga de las opciones de los selects para los tipos de canchas
   * y los tipos de piso, tambien oculta el select de tipo de cancha si el deporte seleccionado
   * es PADEL
   * 
   * CAMBIAR NOMBRE
   */
  getTiposCanchas(event:any){
    let deporteSeleccionado = event.target.value;

    if(deporteSeleccionado == 'PADEL' || deporteSeleccionado == 0) {
      this.formularioRegistrarCancha.controls['tipoCancha'].disable()
    } 
    else{
      this.formularioRegistrarCancha.controls['tipoCancha'].enable()
    }
    this.formularioRegistrarCancha.controls['tipoPiso'].enable()
    this.tiposDeportes = this.canchasServices.getTipoCancha(deporteSeleccionado)
    this.tiposPisos = this.canchasServices.getTipoPiso(deporteSeleccionado)
    this.seleccionaDeportePadel = deporteSeleccionado == 'PADEL' ? false : true;
    
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

    /**
   * ESTE METODO REGISTRA LA CANCHA INVOCANDO EL SERVICIO DE CANCHAS.SERVICE GENERANDO UN POST EN LA BASE DE DATOS
   */
  registrarCancha(){
    console.log(this.formularioRegistrarCancha)

    if (this.formularioRegistrarCancha.invalid) {
      return Object.values(this.formularioRegistrarCancha.controls).forEach(control => {
        control.markAsTouched()
      });    
    }

    let datosFormularios: any = this.formularioRegistrarCancha.value;
    this.cancha.deporte     = datosFormularios.deporte;
    this.cancha.tipoCancha  = datosFormularios.tipoCancha;
    this.cancha.tipoPiso    = datosFormularios.tipoPiso;
    this.cancha.descripcion = datosFormularios.descripcion;
    this.cancha.fotos       = this.archivos;
    this.vaciarFormularioRegistrarCancha()
}

  vaciarFormularioRegistrarCancha(){
    this.formularioRegistrarCancha.reset()
    this.archivos = []
  }

  /**
   * Logica para obtener y visualizar imagen
   **/


  /**
   * ESTE METODO CAPTURA EL ARCHIVO SELECCIONADO POR EL USUARIO Y VALIDA QUE SU EXTENSION SEA
   * .PNG, .JPEG O .JPG. SI PASA LA VALIDACION EXTRAE LA BASE64 Y LA ALMACENA EN UN ARREGLO PARA
   * GUARDARLAS EN LA BASE DE DATOS
   */
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
    console.log(imagen)
    this.archivos.splice(imagen, 1)
  }

}
