import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantallasRoutingModule } from './pantallas-routing.module';
import { GestionComplejoComponent } from './gestion-complejo/gestion-complejo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';
//Wizard
import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    GestionComplejoComponent
  ],
  imports: [
    CommonModule,
    PantallasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    ArchwizardModule,
    DropzoneModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PantallasModule {
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
