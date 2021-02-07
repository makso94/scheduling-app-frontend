import { Component, OnInit } from '@angular/core';
import { isFuture } from 'date-fns';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  user!: User;
  allApp: Array<any> = [];
  upComingApp: Array<any> = [];
  pastApp: Array<any> = [];

  constructor(
    private authService: AuthService,
    public appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(res => this.user = res);
    this.getAppointments();
  }


  getAppointments(): void {
    this.appointmentsService.getByUserId(this.user.id).subscribe(
      res => {
        this.upComingApp = res.data.filter((app: any) => isFuture(new Date(app.start)));
        this.pastApp = res.data.filter((app: any) => !isFuture(new Date(app.start)));
      });
  }

  cancelAppointment(id: number): void {
    console.log(id);
    this.appointmentsService.delete(id).subscribe(() => {
      this.getAppointments();
    });
  }



}
