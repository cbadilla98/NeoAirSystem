import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './modulos/admin/admin/admin.component';
import { UsuarioFormComponent } from './modulos/admin/usuario-form/usuario-form.component';
import { MantenimientosComponent } from './layouts/mantenimientos/mantenimientos.component';
import { UserComponent } from './layouts/user/user.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";



// import { authInterceptorProviders } from './helpers/auth.interceptor';
// import { PostComponent } from './components/blog/post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RutasComponent } from './modulos/admin/rutas/rutas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TipoAvionComponent } from './modulos/admin/tipo-avion/tipo-avion.component';
import { TipoAvionFormComponent } from './modulos/admin/tipo-avion-form/tipo-avion-form.component';
import { HorariosComponent } from './modulos/admin/horarios/horarios.component';
import { AvionesComponent } from './modulos/admin/aviones/aviones.component';
import { AvionesFormComponent } from './modulos/admin/aviones-form/aviones-form.component';
import { ClaseComponent } from './modulos/admin/clase/clase.component';
import { LoginComponent } from './modulos/user/login/login.component';
import { OfertasComponent } from './modulos/admin/ofertas/ofertas.component';
import {TiqueteComponent} from './modulos/admin/tiquete/tiquete.component'
import {TiqueteFormComponent} from './modulos/admin/tiquete-form/tiquete-form.component'
import { AsientosClaseComponent } from './modulos/admin/asientos-clase/asientos-clase.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MantenimientosComponent,
    UserComponent,
    RutasComponent,
    UsuarioFormComponent,
    TipoAvionComponent,
    TipoAvionFormComponent,
    HorariosComponent,
    AvionesComponent,
    AvionesFormComponent,
    LoginComponent,
    OfertasComponent,
    ClaseComponent,
    TiqueteComponent,
    TiqueteFormComponent,
    AsientosClaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    GoogleMapsModule,
    DateTimePickerModule
    //AIzaSyAtvh2PaRvmpYDyOinNGFpDsOMEdWl4ESY
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
