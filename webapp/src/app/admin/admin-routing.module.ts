import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { AdminServiceComponent } from './components/services/admin-service/admin-service.component';
import { AdminServicesComponent } from './components/services/admin-services/admin-services.component';
import { UsersComponent } from './components/users/users.component';
import { WorkingDaysListComponent } from './components/working-days/working-days-list/working-days-list.component';
import { WorkingDaysComponent } from './components/working-days/working-days/working-days.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashComponent,
    children: [
      {
        path: 'working-days',
        component: WorkingDaysListComponent
      },
      {
        path: 'working-days/create',
        component: WorkingDaysComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
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
      },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
