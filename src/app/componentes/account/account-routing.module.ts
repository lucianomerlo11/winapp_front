import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component Pages
import { RegistrarseComponent } from "./registrarse/registrarse.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "registrarse", component: RegistrarseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
