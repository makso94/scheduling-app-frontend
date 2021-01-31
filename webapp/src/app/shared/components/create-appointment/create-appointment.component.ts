import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarEvent, CalendarMonthViewDay, CalendarView } from 'angular-calendar';
import { format, formatISO, getMonth, getYear, startOfDay } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { ServiceData } from 'src/app/admin/models/services.models';
import { ServicesService } from 'src/app/admin/services/services.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAppointmentComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    service_ids: ['', Validators.required],
    user_id: ['', Validators.required],
    working_day_id: [1, Validators.required],
    start: ['', Validators.required]
  });

  serviceList!: Array<ServiceData>;

  // Calendar variables
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  CalendarView = CalendarView;
  selectedDays: Array<any> = [];

  // Subscriptions
  ServiceSubs!: Subscription;
  UserSubs!: Subscription;
  clickedDate!: Date;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    public servicesService: ServicesService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.ServiceSubs = this.servicesService.getAll().subscribe(res => {
      this.serviceList = res.data;
    });

    this.UserSubs = this.authService.loggedUser$.subscribe(user => {
      this.form.get('user_id')?.setValue(user.id);
    });

    this.appointmentsService.getByMonthYear(getMonth((this.viewDate)) + 1, getYear(this.viewDate)).subscribe(res => {
      console.log(res);

      res.data.forEach(day => {
        this.selectedDays.push({
          date: startOfDay(new Date(day.date)),
          cssClass: 'cal-day-selected'
        });

        day.appointments.forEach(app => {
          let finalTitle = '';
          app.services.forEach(service => {
            console.log(service.name);
            !!finalTitle.length ?
              finalTitle = finalTitle.concat(` | ${service.name}`) :
              finalTitle = finalTitle.concat(`${service.name}`);
          });
          this.events.push({
            start: app.start,
            end: app.end,
            title: finalTitle
          });
        });
      });


      this.refresh.next();
      console.log(this.events);
    });

    this.form.valueChanges.subscribe(console.log);


  }
  ngOnDestroy(): void {
    this.UserSubs.unsubscribe();
    this.ServiceSubs.unsubscribe();
  }



  create(): void {
    this.appointmentsService.create(this.form.value).subscribe(res => {
      console.log(res);
    });
  }



  changeDay(date: Date): void {
    this.viewDate = date;
    this.view = CalendarView.Week;
  }


  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    // this.activeDayIsOpen = false;
  }

  slotClicked(dateTime: Date): void {
    this.form.get('start')?.setValue(format(dateTime, `Y-MM-dd HH:mm:ss`));
  }



  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (day.date.getMonth() === this.viewDate.getMonth()) {
        if (
          this.selectedDays.some(
            (selectedDay: any) => selectedDay.date.getTime() === day.date.getTime()
          )
        ) {
          day.cssClass = 'cal-day-selected';
        }
        else {
          day.cssClass = 'cal-day-not-selected';

        }
      }
    });
  }
}
