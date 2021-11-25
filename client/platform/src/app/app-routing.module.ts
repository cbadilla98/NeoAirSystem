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
        path: 'usuario', component : UsuarioFormComponent
      },
      {
        path: 'usuario/:id', component : UsuarioFormComponent
      },
      {
        path: 'tipoAvionesForm', component : TipoAvionFormComponent
      },
    ],
  },
  //usuario
  {
    path: '', component: UserComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'inicio', component: HomeComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
