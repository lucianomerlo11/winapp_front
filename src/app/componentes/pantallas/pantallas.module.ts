import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { GestionComplejoComponent } from './gestion-complejo/gestion-complejo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';
// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// Pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';
import { GestionDeCanchaComponent } from './gestion-de-canchas/gestion-de-canchas.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    GestionComplejoComponent,
    GestionarUsuarioComponent,
    GestionDeCanchaComponent
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    DropzoneModule,
    NgxPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PantallasModule {
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
