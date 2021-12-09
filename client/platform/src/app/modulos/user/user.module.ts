import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TiqueteBusquedaComponent } from './tiquete-busqueda/tiquete-busqueda.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    TiqueteBusquedaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
