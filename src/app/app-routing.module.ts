import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDeCanchaComponent } from './componentes/gestion-de-canchas/gestion-de-canchas.component';
import { IndexComponent } from './componentes/landing/index/index.component';
import { LandingModule } from './componentes/landing/landing.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./componentes/landing/landing.module').then(m => m.LandingModule) },
  { path: 'mis-canchas', component: GestionDeCanchaComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/mis-canchas'}
  // { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  // { path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule), canActivate: [AuthGuard] },
  // { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
