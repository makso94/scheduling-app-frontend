import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { AdminServicesComponent } from './components/services/admin-services/admin-services.component';
import { MaterialModule } from '../material/material.module';
import { AdminServiceComponent } from './components/services/admin-service/admin-service.component';
import { MinutesToHoursPipe } from '../shared/pipes/minutes-to-hours.pipe';
import { UsersComponent } from './components/users/users.component';
import { WorkingDaysListComponent } from './components/working-days/working-days-list/working-days-list.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { WorkingDaysComponent } from './components/working-days/working-days/working-days.component';
import { EditWorkingDayDialogComponent } from './components/working-days/edit-working-day-dialog/edit-working-day-dialog.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AdminDashComponent,
    AdminServicesComponent,
    AdminServiceComponent,
    MinutesToHoursPipe,
    UsersComponent,
    WorkingDaysListComponent,
    WorkingDaysComponent,
    EditWorkingDayDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [],
})
export class AdminModule { }
