import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RutasComponent } from './components/rutas/rutas.component';
const routes: Routes = [{
  path: 'platform',
  component: AppComponent
}, {
  path: 'rutas', component: RutasComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
