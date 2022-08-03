import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/modelos/cliente';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {

  clienteLogueado: any;

  deportes: any[];
  puestosDeporte: any[];
  tiposDocumento: any[];

  FormReg!: FormGroup;
  FormJugador!: FormGroup;

  AccionABMC = "C";
  
  constructor(private usuarioService: UsuariosService,
              private fireService: FirebaseService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.FormReg = this.formBuilder.group({
      apellido: [''],
      nombre: [''],
      telefono: [''],
      email: [''],
      id_tipo_documento: [''],
      fecha_nacimiento: [''],
      numero_documento: [''],
    });

    this.FormJugador = this.formBuilder.group({
      idDeporte: [''],
      idPuesto: ['']
    });

    this.getDatosUsuario();
    this.setupPantalla();
  }

  async getDatosUsuario(){
    const user = await this.fireService.getUserLogged();
    if (user){
      this.usuarioService.getUsuarioById(user?.uid)
      .subscribe((res: any) => {
        this.clienteLogueado = res;
      })
    }
  }

  setupPantalla(){
    this.usuarioService.setupPantalla()
      .subscribe((res: any) => {
        this.tiposDocumento = res;
      })
  }

  editarPerfil(){
    this.AccionABMC = "M";
    this.FormReg.patchValue(this.clienteLogueado);
  }

  guardar(modalExito){
    //creamos objeto a pasar
    const cliente: any = {
      apellido: this.FormReg.value.apellido,
      email: this.FormReg.value.email,
      esJugador: false,
      fecha_nacimiento: this.FormReg.value.fecha_nacimiento,
      id_cliente: this.clienteLogueado.id_cliente,
      nombre: this.FormReg.value.nombre,
      numero_documento: this.FormReg.value.numero_documento,
      telefono: this.FormReg.value.telefono,
      tipo_documento: {
        id_tipo_documento: this.FormReg.value.id_tipo_documento,
        nombre: null
      },
      usuario: {
        esActivo: true,
        fecha_alta: null,
        fecha_baja: null,
        id_usuario: this.clienteLogueado.id_usuario,
        perfil: {
          id_perfil: 24,
          nombre: null
        }
      }
    };

    this.usuarioService.modificarCliente(cliente).subscribe((res: any) => {
      if (res) {
        //Abro el modal de exito.
        this.modalService.open(modalExito, { centered: true });
      }
    })
  }

  cancelar(){
    this.AccionABMC = "C";
    this.FormReg.reset();
  }
}
