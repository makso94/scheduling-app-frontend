import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { CalendarEvent, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { addHours, addMinutes, format, getHours, getMonth, getTime, getYear, isWithinInterval, startOfDay } from 'date-fns';
import { find, includes, isNil } from 'lodash';
import { Subject, Subscription } from 'rxjs';
import { WorkingDay, WorkingDaysWithAppointments } from 'src/app/admin/components/working-days/models/working-days-model';
import { ServiceData } from 'src/app/admin/models/services.models';
import { ServicesService } from 'src/app/admin/services/services.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppointmentsService } from '../../services/appointments.service';
import { WeekViewHourColumn } from 'calendar-utils';
import { Router } from '@angular/router';


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
  selectedServices: ServiceData[] = [];
  // Calendar variables
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  workingDays: Array<WorkingDay> = [];
  rawDays: Array<WorkingDaysWithAppointments> = [];
  dayStartHour = 9;
  dayEndHour = 17;
  totalDuration = 0;
  hourColumns!: WeekViewHourColumn[];
  selectedDayViewDate!: Date;
  daySlots: Date[] = [];

  // Subscriptions
  ServiceSubs!: Subscription;
  UserSubs!: Subscription;
  clickedDate!: Date;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    public servicesService: ServicesService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.ServiceSubs = this.servicesService.getAll().subscribe(res => {
      this.serviceList = res.data;
    });

    this.UserSubs = this.authService.loggedUser$.subscribe(user => {
      this.form.get('user_id')?.setValue(user.id);
    });

    this.getAppointments();

    this.form.valueChanges.subscribe(res => {
      // console.log(res);
      if (isNil(res.service_ids)) {
        return;
      }
      this.selectedServices = [];
      res.service_ids.forEach((sId: number) => {
        this.selectedServices.push(find(this.serviceList, { id: sId }) || new ServiceData());
      });

    });


  }
  ngOnDestroy(): void {
    this.UserSubs.unsubscribe();
    this.ServiceSubs.unsubscribe();
  }
  selectionChanged(event: MatSelectionListChange): void {
    this.totalDuration = 0;
    event.source._value?.forEach(element => {
      const findedService: any = find(this.serviceList, { id: element });
      this.totalDuration += findedService?.duration;

    });

    this.form.get('service_ids')?.setValue(event.source._value);
  }

  getAppointments(): void {
    this.events = [];
    this.appointmentsService.getByMonthYear(getMonth((this.viewDate)) + 1, getYear(this.viewDate)).subscribe(res => {
      this.rawDays = res.data;
      res.data.forEach(day => {
        this.workingDays.push({
          date: startOfDay(new Date(day.date)),
          cssClass: 'cal-day-selected',
          id: day.id
        });

        day.appointments.forEach(app => {
          let finalTitle = '';
          app.services.forEach(service => {
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
    });
  }

  create(): void {
    this.appointmentsService.create(this.form.value).subscribe(res => {
      this.router.navigate([`/customer/appointments`]);
    });
  }



  changeDay(event: any): void {
    console.log(event);

    if (event.day.isPast || event.day.isToday) {
      this.snackBar.open(`Unable to make an appointment in past.`, 'Close', { verticalPosition: 'top', duration: 2000 });
      return;
    }

    if (event.day.meta?.workingDayId) {
      const findedDay = find(this.rawDays, { id: event.day.meta.workingDayId });
      if (isNil(findedDay)) { return; }
      this.dayStartHour = getHours(new Date(findedDay?.opens));
      this.dayEndHour = getHours(new Date(findedDay?.closes));

      this.form.get('working_day_id')?.setValue(event.day.meta.workingDayId);
      this.viewDate = event.day.date;
      this.view = CalendarView.Day;
    }
    else {
      this.snackBar.open(`Unable to make an appointment for this day.`, 'Close', { verticalPosition: 'top', duration: 2000 });
    }
  }
  onViewDateChange(): void {
    this.getAppointments();
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    // this.activeDayIsOpen = false;
  }

  slotClicked(date: Date): void {
    if (!includes(this.daySlots, date)) {
      this.snackBar.open(
        `Unable to make an appointment at this time slot.`,
        'Close',
        { verticalPosition: 'top', duration: 2000 });
      return;
    }
    this.form.get('start')?.setValue(format(date, `Y-MM-dd HH:mm:ss`));
    this.stepper.next();
  }



  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {

    body.forEach((day) => {
      if (day.date.getMonth() === this.viewDate.getMonth()) {
        let tmpDay = new WorkingDay();
        if (
          this.workingDays.some(
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

  beforeDayViewRender(event: CalendarWeekViewBeforeRenderEvent): void {
    this.daySlots = [];
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
    this.refresh.next();
  }

  private addSelectedDayViewClass(): void {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          const appEndDate = addMinutes(segment.date.getTime(), this.totalDuration).getTime();
          if (
            (appEndDate <= addHours(column.date, this.dayEndHour + 1).getTime()) &&
            !this.checkIsInEvents(column.events, segment.date)
          ) {
            this.daySlots.push(segment.date);
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });

  }

  private checkIsInEvents(events: any[], segmentDate: Date): boolean {
    let result = false;
    events.forEach(element => {
      if (
        isWithinInterval(addMinutes(segmentDate, 1), { start: element.event.start, end: element.event.end })
        // (isWithinInterval(addMinutes(segmentDate, this.totalDuration + 1), { start: element.event.start, end: element.event.end }))
        || (
          segmentDate.getTime() < element.event.start.getTime() &&
          (addMinutes(segmentDate, this.totalDuration).getTime() > element.event.start.getTime()))
      ) {
        result = true;
        return;
      }
    });
    return result;
  }

  stepperChanged(event: any): void {
    this.view = CalendarView.Month;
  }

}
