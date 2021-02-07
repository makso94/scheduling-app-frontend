import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { add, setMinutes } from 'date-fns';
import { head } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseWorkingDays } from 'src/app/admin/components/working-days/models/working-days-model';
import { API } from '../../constants';
import { ResponseAppointments } from './appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }


  getByMonthYear(month: number, year: number): Observable<ResponseWorkingDays> {
    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    const params = new HttpParams()
      .set('month', month.toString())
      .set('year', year.toString());


    return this.http.get<ResponseWorkingDays>(`${API}/appointments`, { headers, params })
      .pipe(
        map(res => {
          res.data.forEach(workingDay => {
            workingDay.appointments.map(appointment => {
              // calculating appointment end dateTime based on service durations
              appointment.start = new Date(appointment.start);
              let totalDurationMins = 0;
              appointment.services.forEach(service => {
                totalDurationMins += service.duration;
              });
              appointment.end = add(appointment.start, { minutes: totalDurationMins });
            });
          });
          return res;
        })
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
            app.start = new Date(app.start);
            let totalDurationMins = 0;
            app.services.forEach(service => {
              totalDurationMins += service.duration;
            });
            app.end = add(app.start, { minutes: totalDurationMins });
          });
          return res;
        })
      );
  }

  create(formData: any): Observable<any> {
    return this.http.post(`${API}/appointments`, formData);
  }


  getByUserId(id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    return this.http.get(`${API}/appointments/user/${id}`, { headers });
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${API}/appointments/${id}`);
  }

}
