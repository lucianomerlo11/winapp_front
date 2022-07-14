import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { GestionComplejoComponent } from './componentes/gestion-complejo/gestion-complejo.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionComplejoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
