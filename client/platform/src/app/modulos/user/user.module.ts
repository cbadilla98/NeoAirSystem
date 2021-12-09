import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TiqueteBusquedaComponent } from './tiquete-busqueda/tiquete-busqueda.component';
import { TiqueteDetalleComponent } from './tiquete-detalle/tiquete-detalle.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    TiqueteBusquedaComponent,
    TiqueteDetalleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
