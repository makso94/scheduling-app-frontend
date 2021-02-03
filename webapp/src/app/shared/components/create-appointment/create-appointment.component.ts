import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { CalendarEvent, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { format, formatISO, getMonth, getYear, startOfDay } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { WorkingDay } from 'src/app/admin/components/working-days/models/working-days-model';
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
  @ViewChild('stepper') stepper!: MatHorizontalStepper;

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
  selectedDays: Array<WorkingDay> = [];

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
      res.data.forEach(day => {
        this.selectedDays.push({
          date: startOfDay(new Date(day.date)),
          cssClass: 'cal-day-selected',
          id: day.id
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



  changeDay(event: any): void {
    console.log(event);
    if (event.day.meta?.workingDayId) {
      this.form.get('working_day_id')?.setValue(event.day.meta.workingDayId);
      this.viewDate = event.day.date;
      this.view = CalendarView.Day;
    }
    else if (event.day.isPast) {
      window.alert(`You can not make an appointment in past.`);

    }
    else {
      window.alert(`You can not make an appointment for this day.`);
    }
  }


  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    // this.activeDayIsOpen = false;
  }

  slotClicked(dateTime: Date): void {
    this.form.get('start')?.setValue(format(dateTime, `Y-MM-dd HH:mm:ss`));
    this.stepper.next();
  }



  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {

    body.forEach((day) => {
      if (day.date.getMonth() === this.viewDate.getMonth()) {
        let tmpDay = new WorkingDay;
        if (
          this.selectedDays.some(
            (selectedDay: WorkingDay) => {
              tmpDay = selectedDay;
              return selectedDay.date?.getTime() === day.date.getTime();
            }
          )
        ) {
          day.cssClass = 'cal-day-selected';
          day.meta = { workingDayId: tmpDay?.id };
        }
        else {
          day.cssClass = 'cal-day-not-selected';

        }
      }
    });
  }



}
