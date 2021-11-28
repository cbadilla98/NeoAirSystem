import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HorariosComponent } from './horarios/horarios.component';
import { RutasComponent } from './rutas/rutas.component';
import { TipoAvionComponent } from './tipo-avion/tipo-avion.component';
import { AvionesComponent } from './aviones/aviones.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TipoAvionFormComponent } from './tipo-avion-form/tipo-avion-form.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";



@NgModule({
  declarations: [
    AdminComponent,
    HorariosComponent,
    RutasComponent,
    TipoAvionComponent,
    AvionesComponent,
    UsuarioFormComponent,
    TipoAvionFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    NgbModule,
    GoogleMapsModule,
    DateTimePickerModule
  ]
})
export class AdminModule { }
