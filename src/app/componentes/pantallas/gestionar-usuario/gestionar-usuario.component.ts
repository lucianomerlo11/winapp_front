import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {

  clienteLogueado: any;
  constructor(private usuarioService: UsuariosService,
              private fireService: FirebaseService) { }

  ngOnInit(): void {
    this.getDatosUsuario();
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
}
