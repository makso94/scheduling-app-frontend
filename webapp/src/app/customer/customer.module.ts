import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';


@NgModule({
  declarations: [CustomerComponent, AppointmentListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class CustomerModule { }
