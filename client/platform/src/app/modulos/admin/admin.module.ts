import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HorariosComponent } from './horarios/horarios.component';
import { RutasComponent } from './rutas/rutas.component';
import { TipoAvionComponent } from './tipo-avion/tipo-avion.component';
import { AvionesComponent } from './aviones/aviones.component'; 



@NgModule({
  declarations: [
    AdminComponent,
    HorariosComponent,
    RutasComponent,
    TipoAvionComponent,
    AvionesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
