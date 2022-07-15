import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDeCanchaComponent } from './componentes/pantallas/gestion-de-canchas/gestion-de-canchas.component';
import { IndexComponent } from './componentes/landing/index/index.component';
import { LandingModule } from './componentes/landing/landing.module';


const routes: Routes = [
  { path: '', loadChildren: () => import('./componentes/landing/landing.module').then(m => m.LandingModule) },
  // { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  { path: 'ag', loadChildren: () => import('./componentes/pantallas/pantallas.module').then(m => m.PantallasModule)},
  // { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
