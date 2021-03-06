import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarView, CalendarMonthViewDay, CalendarEvent } from 'angular-calendar';
import { format, getDaysInMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';
import { Legend } from 'src/app/shared/components/generic-legend/generic-legend.component';
import { EditWorkingDayDialogComponent } from '../edit-working-day-dialog/edit-working-day-dialog.component';
import { RequestWorkingDays } from '../models/working-days-model';
import { WorkingDaysService } from '../services/working-days.service';
import { compareDateTime } from 'src/app/shared/validators/form-validators';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkingDaysComponent implements OnInit {
  form = this.fb.group({
    opens: ['09:00', Validators.required],
    closes: ['19:00', Validators.required]
  }, {
    validators: compareDateTime
  });

  year!: number;
  month!: number;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  selectedMonthViewDay!: CalendarMonthViewDay;
  selectedDayViewDate!: Date;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  selectedDays: Array<any> = [];
  workingDaysData: Array<any> = [];
  createMode = false;
  legends: Array<Legend> = [
    new Legend('Working Days', 'rgba(40, 167, 69, 0.5)'),
    new Legend('Days off', 'rgba(220, 53, 69, 0.5)')];

  constructor(
    private workingDaysService: WorkingDaysService,
    private dialog: MatDialog,
    private appointmentsService: AppointmentsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.year = this.viewDate.getFullYear();
    this.month = this.viewDate.getMonth() + 1;
    this.getMonthYearData();
    this.form.valueChanges.subscribe(res => {
      console.log(res, this.form.valid);


    });
  }

  getMonthYearData(): void {
    // reset selected days
    this.selectedDays = [];
    this.workingDaysData = [];

    this.workingDaysService.get(this.year, this.month).subscribe(
      res => {
        if (res?.data.length === 0) {
          this.createMode = true;
          this.refresh.next();
          return;
        }

        this.createMode = false;
        this.workingDaysData = res.data;
        res.data.forEach((element: any) => {
          this.selectedDays.push({
            date: startOfDay(new Date(element.date)),
            cssClass: 'cal-day-selected'
          });
        });
        this.refresh.next();
      }
    );

  }

  dayClicked(day: CalendarMonthViewDay): void {
    if (this.createMode) {
      if (day.date.getMonth() === this.viewDate.getMonth()) {
        this.selectedMonthViewDay = day;
        const selectedDateTime = this.selectedMonthViewDay.date.getTime();

        const dateIndex = this.selectedDays.findIndex(
          (selectedDay: any) => selectedDay.date.getTime() === selectedDateTime
        );
        if (dateIndex > -1) {
          delete this.selectedMonthViewDay.cssClass;
          this.selectedDays.splice(dateIndex, 1);
          day.cssClass = 'cal-day-not-selected';

        } else {

          this.selectedDays.push(this.selectedMonthViewDay);
          day.cssClass = 'cal-day-selected';
          this.selectedMonthViewDay = day;
        }
      }
    } else if (day.date.getMonth() === this.viewDate.getMonth()) {
      const extractedDate = format(day.date, 'yyyy-MM-dd');
      const findedDay = this.workingDaysData.filter(el => el.date === extractedDate)[0];

      if (!!findedDay) {
        {
          this.appointmentsService.getByWorkingDayId(findedDay.id).subscribe(
            res => {
              console.log(res);

              this.dialog.open(EditWorkingDayDialogComponent, {
                width: '600px',
                data: { day: findedDay, appointments: res.data }
              }).afterClosed().subscribe(updateDialogRes => {
                if (updateDialogRes) {
                  if (updateDialogRes?.dayOff) {
                    this.workingDaysService.delete(findedDay.id)
                      .subscribe(() => {
                        this.getMonthYearData();
                      });
                    return;
                  }

                  this.workingDaysService.update(findedDay.id, {
                    opens: updateDialogRes.opens,
                    closes: updateDialogRes.closes
                  }).subscribe(() => {
                    this.getMonthYearData();
                  });

                }
              });

            }
          );
        }
      }
      else {
        // creates working day
        this.dialog.open(EditWorkingDayDialogComponent, {
          width: '600px',
          data: { createWorkingDay: extractedDate }
        }).afterClosed().subscribe(res => {
          if (!!res) {
            const req = new RequestWorkingDays();
            req.year = this.year;
            req.month = this.month;
            req.opens = res.opens;
            req.closes = res.closes;
            req.days.push(day.date.getDate());

            this.workingDaysService.create(req).subscribe(
              () => {
                // refreshes calendar after created new working day
                this.getMonthYearData();
              }
            );
          }

        });
      }
    }

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

  selectWholeMonth(): void {
    for (let index = 1; index <= getDaysInMonth(this.viewDate); index++) {
      this.selectedDays.push({
        date: startOfDay(new Date(`${this.viewDate.getFullYear()}-${this.viewDate.getMonth() + 1}-${index}`)),
        cssClass: 'cal-day-selected'
      });
    }

    this.refresh.next();
  }


  deselectWholeMonth(): void {
    for (let index = 1; index <= getDaysInMonth(this.viewDate); index++) {
      this.selectedDays = [];
    }

    this.refresh.next();
  }

  onViewDateChange(): void {
    this.selectedDays = [];
    this.year = this.viewDate.getFullYear();
    this.month = this.viewDate.getMonth() + 1;

    this.getMonthYearData();

  }

  submit(): void {
    const req = new RequestWorkingDays();
    req.year = this.year;
    req.month = this.month;
    req.opens = this.form.get('opens')?.value;
    req.closes = this.form.get('closes')?.value;
    this.selectedDays.forEach(day => {
      req.days.push(day.date.getDate());
    });

    this.workingDaysService.create(req).subscribe(
      () => {
        this.createMode = false;
        this.getMonthYearData();
      }
    );

  }

}
