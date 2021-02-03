import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAppointmentComponent } from '../shared/components/create-appointment/create-appointment.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';

import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'appointments',
        component: AppointmentListComponent
      },
      {
        path: 'appointments/create',
        component: CreateAppointmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
