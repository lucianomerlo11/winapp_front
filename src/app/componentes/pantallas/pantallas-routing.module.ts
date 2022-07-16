import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComplejoComponent } from './gestion-complejo/gestion-complejo.component';
import { BajaComplejoComponent } from './baja-complejo/baja-complejo.component';
const routes: Routes = [
  { path:"registrarComplejo" , component:GestionComplejoComponent},
  { path:"bajaComplejo" , component:BajaComplejoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRoutingModule { }
