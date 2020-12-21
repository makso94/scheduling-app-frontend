import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { AdminServiceComponent } from './components/services/admin-service/admin-service.component';
import { AdminServicesComponent } from './components/services/admin-services/admin-services.component';

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
        component: AdminServiceComponent
      }
      ,
      {
        path: 'services/edit/:id',
        component: AdminServiceComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
