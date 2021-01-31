import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GenericLegendComponent } from './components/generic-legend/generic-legend.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { UserNotApprovedComponent } from './components/user-not-approved/user-not-approved.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const sharedComponents = [
  PageNotFoundComponent,
  GenericLegendComponent,
  UserNotApprovedComponent,
  CreateAppointmentComponent
];

@NgModule({
  declarations: sharedComponents,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),],
  exports: sharedComponents
})
export class SharedModule { }
