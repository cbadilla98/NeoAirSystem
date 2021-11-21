import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [{ path: '/mantenimientos', component: AdminComponent }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
