import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './componentes/layout/layout.module';
import { PantallasModule } from './componentes/pantallas/pantallas.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    PantallasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
