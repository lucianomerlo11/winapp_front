import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() mobileMenuButtonClicked = new EventEmitter();

  mode: string | undefined;
  element: any;
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;

  clienteLogueado: any;
  
  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router,
              private fireService: FirebaseService,
              private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
  }

  async obtenerUsuarioLogueado(){
    const user = await this.fireService.getUserLogged();
    if (user) {
      if (user?.displayName == null) {
        this.usuarioService.getUsuarioById(user?.uid).subscribe((res: any) => {
          if (res) {
            this.clienteLogueado = res;
          }
        })
      }
    }
  }

  /**
   * Toggle the menu bar when having mobile screen
  */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
  */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Logout the user
   */
  logout() {
    this.fireService.logout();
    this.router.navigate(['/auth/login']);
  }

  /**
  * Topbar Light-Dark Mode Change
  */
   changeMode(mode: string) {
    this.mode = mode;
    // this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.body.setAttribute('data-layout-mode', "light");
        document.body.setAttribute('data-sidebar', "light");
        break;
      case 'dark':
        document.body.setAttribute('data-layout-mode', "dark");
        document.body.setAttribute('data-sidebar', "dark");
        break;
      default:
        document.body.setAttribute('data-layout-mode', "light");
        break;
    }
  }

}
