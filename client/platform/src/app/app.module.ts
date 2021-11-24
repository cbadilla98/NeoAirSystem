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

// import { authInterceptorProviders } from './helpers/auth.interceptor';
// import { PostComponent } from './components/blog/post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RutasComponent } from './modulos/admin/rutas/rutas.component';
import { TipoAvionComponent } from './modulos/admin/tipo-avion/tipo-avion.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MantenimientosComponent,
    UserComponent,
    RutasComponent,
    UsuarioFormComponent,
    TipoAvionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
