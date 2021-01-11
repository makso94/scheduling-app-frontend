import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalendarView, CalendarMonthViewDay, CalendarEvent } from 'angular-calendar';
import { getDaysInMonth, startOfDay } from 'date-fns';
import { sortBy } from 'lodash';
import { Subject } from 'rxjs';
import { RequestWorkingDays } from '../models/working-days-model';
import { WorkingDaysService } from '../services/working-days.service';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorkingDaysComponent implements OnInit {
  openAtControl = new FormControl('09:00');
  closeAtControl = new FormControl('19:00');
  year!: number;
  month!: number;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  selectedMonthViewDay!: CalendarMonthViewDay;
  selectedDayViewDate!: Date;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  selectedDays: Array<any> = [];

  constructor(
    private workingDaysService: WorkingDaysService
  ) { }

  ngOnInit(): void {
    this.year = this.viewDate.getFullYear();
    this.month = this.viewDate.getMonth() + 1;
    this.getMonthYearData();
  }

  getMonthYearData(): void {
    this.workingDaysService.get(this.year, this.month).subscribe(
      res => {
        console.log(res);
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
        console.log(this.selectedDays);
        day.cssClass = 'cal-day-selected';
        this.selectedMonthViewDay = day;
      }
    }

  }


  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    console.log('beforeMonthViewRender');

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
    req.opens = this.openAtControl.value;
    req.closes = this.closeAtControl.value;
    this.selectedDays.forEach(day => {
      req.days.push(day.date.getDate());
    });

    console.log(req);
    this.workingDaysService.create(req).subscribe();

  }

}
