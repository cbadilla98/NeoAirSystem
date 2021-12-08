import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { MantenimientosComponent } from './layouts/mantenimientos/mantenimientos.component';
import { UserComponent } from './layouts/user/user.component'
import { AdminComponent } from './modulos/admin/admin/admin.component';
import { AvionesComponent } from './modulos/admin/aviones/aviones.component';
import { HorariosComponent } from './modulos/admin/horarios/horarios.component';
import { RutasComponent } from './modulos/admin/rutas/rutas.component';
import { TipoAvionComponent } from './modulos/admin/tipo-avion/tipo-avion.component';
import { HomeComponent } from './modulos/user/home/home.component';
import { UsuarioFormComponent } from './modulos/admin/usuario-form/usuario-form.component';
import { TipoAvionFormComponent } from './modulos/admin/tipo-avion-form/tipo-avion-form.component';
import { AvionesFormComponent } from './modulos/admin/aviones-form/aviones-form.component';
import { LoginComponent } from './modulos/user/login/login.component';
import { OfertasComponent } from './modulos/admin/ofertas/ofertas.component';
import { ClaseComponent } from './modulos/admin/clase/clase.component';
import { TiqueteComponent } from './modulos/admin/tiquete/tiquete.component'
import { TiqueteFormComponent } from './modulos/admin/tiquete-form/tiquete-form.component';
import { AsientosClaseComponent } from './modulos/admin/asientos-clase/asientos-clase.component';
const routes: Routes = [
  {
    //admin
    path: '', component: MantenimientosComponent,
    children: [
      { path: '', redirectTo: '/mantenimientos', pathMatch: 'full' },
      {
        path: 'admin', component : AdminComponent,
      },
      {
        path: 'horarios', component : HorariosComponent
      },
      {
        path: 'rutas', component : RutasComponent
      },
      {
        path: 'tipoAvion', component : TipoAvionComponent
      },
      {
        path: 'aviones', component : AvionesComponent
      },
      {
        path: 'avionesForm', component : AvionesFormComponent
      },
      {
        path: 'avionesForm/:id', component : AvionesFormComponent
      },
      {
        path: 'usuario', component : UsuarioFormComponent
      },
      {
        path: 'usuario/:id', component : UsuarioFormComponent
      },
      {
        path: 'tipoAvionesForm', component : TipoAvionFormComponent
      },
      {
        path: 'tipoAvionesForm/:id', component : TipoAvionFormComponent
      },
      {

        path: 'ofertas', component : OfertasComponent
      },
      {
        path: 'clases', component : ClaseComponent
      },
      {
        path: 'clases/:id', component : ClaseComponent
      },
      {
        path: 'tiqueteForm', component : TiqueteFormComponent
      },
      {
        path: 'tiqueteForm/:id', component : TiqueteFormComponent
      },
      {
        path: 'tiquete', component : TiqueteComponent
      },
      {
        path: 'asientosClase', component : AsientosClaseComponent
      },

    ],
  },
  //usuario
  {
    path: '', component: UserComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'inicio', component: HomeComponent},
      { path: 'login', component: LoginComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
