import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-gestionar-usuario',
  templateUrl: './gestionar-usuario.component.html',
  styleUrls: ['./gestionar-usuario.component.scss']
})
export class GestionarUsuarioComponent implements OnInit {

  Lista: any;
  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.getDatosUsuario();
  }

  getDatosUsuario(){
    this.usuarioService.getUsuarioById(1)
      .subscribe((res: any) => {
        this.Lista = res;
        const texto = "Hola";
      })
  }
}
