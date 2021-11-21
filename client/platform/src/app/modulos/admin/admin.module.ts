import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HorariosComponent } from './horarios/horarios.component'; 



@NgModule({
  declarations: [
    AdminComponent,
    HorariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
