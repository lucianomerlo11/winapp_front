import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComplejoComponent } from './gestion-complejo/gestion-complejo.component';
import { GestionarUsuarioComponent } from './gestionar-usuario/gestionar-usuario.component';

const routes: Routes = [
  { path:"gestionComplejo" , component:GestionComplejoComponent},
  { path:"perfil" , component:GestionarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallasRoutingModule { }
