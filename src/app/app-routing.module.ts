import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./componentes/landing/landing.module').then(m => m.LandingModule) },
  { path: 'auth', loadChildren: () => import('./componentes/account/account.module').then(m => m.AccountModule)  },
  // { path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule), canActivate: [AuthGuard] },
  // { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
