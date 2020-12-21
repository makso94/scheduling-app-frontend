import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { AdminServicesComponent } from './components/services/admin-services/admin-services.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminServiceComponent } from './components/services/admin-service/admin-service.component';
import { MinutesToHoursPipe } from '../pipes/minutes-to-hours.pipe';


@NgModule({
  declarations: [AdminDashComponent, AdminServicesComponent, AdminServiceComponent, MinutesToHoursPipe],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
