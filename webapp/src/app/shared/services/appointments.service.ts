import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { add, setMinutes } from 'date-fns';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API } from '../../constants';
import { ResponseAppointments } from './appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) {
    this.getByMonthYear(1,2021).subscribe();
   }


  getByMonthYear(month: number, year: number) {
    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());


    return this.http.get<ResponseAppointments>(`${API}/appointments`, { headers, params })
      .pipe(
        tap(console.log)
      );



  }


  getByWorkingDayId(workingDayId: number): Observable<ResponseAppointments> {

    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    const params = new HttpParams()
      .set('working_days_id', workingDayId.toString());

    return this.http.get<ResponseAppointments>(`${API}/appointments`, { headers, params })
      .pipe(
        map(res => {
          res.data.forEach(app => {
            // calculating appointment end dateTime based on service durations
            app.start = new Date(app.start)
            let totalDurationMins = 0;
            app.services.forEach(service => {
              totalDurationMins += service.duration;
            })
            app.end = add(app.start, { minutes: totalDurationMins });
          })
          return res;
        })
      );
  }
}
