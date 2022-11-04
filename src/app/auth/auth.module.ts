import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas derivadas en la ruta principal
import { AuthRoutingModule } from './auth-routing.module';
import { PagesRoutingModule } from '../pages/pages-routing.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
