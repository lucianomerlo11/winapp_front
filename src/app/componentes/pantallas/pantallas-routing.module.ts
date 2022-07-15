import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComplejoComponent } from './gestion-complejo/gestion-complejo.component';
import { GestionDeCanchaComponent } from './gestion-de-canchas/gestion-de-canchas.component';

const routes: Routes = [
  { path:"gestionComplejo" , component:GestionComplejoComponent},
  { path:"mis-canchas", component: GestionDeCanchaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRoutingModule { }
