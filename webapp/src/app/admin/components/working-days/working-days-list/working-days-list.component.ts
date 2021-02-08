import { ChangeDetectionStrategy, ViewChild, TemplateRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  setHours,
  setMinutes,
  getMonth,
  getYear,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarView,
} from 'angular-calendar';
import { roundToNearest } from 'angular-calendar/modules/common/util';
import { format } from 'date-fns/esm';
import { MatRippleModule } from '@angular/material/core';
import { AppointmentsService } from 'src/app/shared/services/appointments.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-working-days-list',
  templateUrl: './working-days-list.component.html',
  styleUrls: ['./working-days-list.component.css'],
})
export class WorkingDaysListComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  constructor(
    private appointmentsService: AppointmentsService
  ) {
  }


  dayStartHour = 8;
  dayEndHour = 20;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;
  selectedDays: any = [];
  selectedMonthViewDay!: CalendarMonthViewDay;


  ngOnInit(): void {
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
    });

  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }



  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }


  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
