import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { AdminServicesComponent } from './components/services/admin-services/admin-services.component';
import { CreateServiceComponent } from './components/services/create-service/create-service.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashComponent,
    children: [
      {
        path: 'services',
        component: AdminServicesComponent,
      },
      {
        path: 'services/create',
        component: CreateServiceComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
