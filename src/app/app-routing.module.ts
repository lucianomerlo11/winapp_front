import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './componentes/layout/layout.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./componentes/pantallas/pantallas.module').then(m => m.PantallasModule) },
  { path: 'auth', loadChildren: () => import('./componentes/account/account.module').then(m => m.AccountModule)  },
  // { path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule), canActivate: [AuthGuard] },
  // { path: 'landing', loadChildren: () => import('./componentes/landing/landing.module').then(m => m.LandingModule) },
  { path: '', loadChildren: () => import('./componentes/landing/landing.module').then(m => m.LandingModule) },
  
  // { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  // { path: 'ag', loadChildren: () => import('./componentes/pantallas/pantallas.module').then(m => m.PantallasModule)},
  // { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }