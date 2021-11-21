import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RutasComponent } from './components/rutas/rutas.component';
import { MantenimientosComponent } from './layouts/mantenimientos/mantenimientos.component';
import { UserComponent } from './layouts/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    // RutasComponent,
    MantenimientosComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
