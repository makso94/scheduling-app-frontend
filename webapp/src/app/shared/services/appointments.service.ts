import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }


  getByWorkingDayId(workingDayId: number): Observable<any> {

    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    const params = new HttpParams()
      .set('working_days_id', workingDayId.toString());

    return this.http.get(`${API}/appointments`, { headers, params });
  }
}
