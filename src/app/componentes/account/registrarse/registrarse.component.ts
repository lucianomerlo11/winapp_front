import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/modelos/cliente';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {
  
  // Login Form
  FormReg!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';

  emailRegistrado: string;
  passwordRegistrada: string;

  tiposDocumento: any[] = [];

  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private fireSerivce: FirebaseService,
              private usuarioService:  UsuariosService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.FormReg = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      password: ['', Validators.required],
      apellido: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      idTipoDocumento: [''],
      nroDocumento: [''],
      fechaNacimiento: [''],
    });

    this.setupPantalla();
  }

  // convenience getter for easy access to form fields
  get f() { return this.FormReg.controls; }

  setupPantalla(){
    this.usuarioService.setupPantalla().subscribe((res: any) => {
      this.tiposDocumento = res;
    })
  }

  registrar(modalExito) {
    var id_usuario: string;
    this.submitted = true;
    if (this.FormReg.invalid) {
      return;
    }
    else {
      //const {descripcion, fotos, tipoCancha, tipoPiso} = datosFormularios
      this.fireSerivce.registrar(this.FormReg.value.email, this.FormReg.value.password)
        .then((res: any) => {
          id_usuario = res.user.uid;

          //creamos objeto a pasar
          const cliente: Cliente = {
            apellido: this.FormReg.value.apellido,
            email: this.FormReg.value.email,
            esActivo: true,
            esJugador: false,
            fecha_alta: new Date(),
            fecha_baja: null,
            fecha_nacimiento: this.FormReg.value.fechaNacimiento,
            id_usuario: id_usuario,
            nombre: this.FormReg.value.nombre,
            numero_documento: this.FormReg.value.nroDocumento,
            perfil: {
              id_perfil: 24,
              nombre: null
            },
            telefono: this.FormReg.value.telefono,
            tipo_documento: {
              id_tipo_documento: this.FormReg.value.idTipoDocumento,
              nombre: null
            }
          };

          //llamada para guardar el usuario y el cliente
          this.usuarioService.guardarUsuarioCliente(cliente).subscribe((res: any) => {
            if (res) {
              //Guardo el email y contraseña del usuario registrado para iniciar sesion.
              this.emailRegistrado = this.FormReg.value.email;
              this.passwordRegistrada = this.FormReg.value.password;
              //Abro el modal de exito.
              this.modalService.open(modalExito, { centered: true });
              this.submitted = false;
              this.FormReg.reset();
            }
          })
        }
      )
    }
  }

  iniciarSesion() {
    this.fireSerivce.login(this.emailRegistrado, this.passwordRegistrada).then((res: any) => {
      this.router.navigate(['/ag/']);
      this.modalService.dismissAll();
    })
      .catch(err => {
        this.error = err ? err : '';
      });
  }
}
