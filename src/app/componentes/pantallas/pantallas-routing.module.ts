import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComplejoComponent } from './gestion-complejo/gestion-complejo.component';

const routes: Routes = [
  { path:"gestionComplejo" , component:GestionComplejoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRoutingModule { }
