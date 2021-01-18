import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';
import { RequestWorkingDays } from '../models/working-days-model';

@Injectable({
  providedIn: 'root'
})
export class WorkingDaysService {

  constructor(private http: HttpClient) { }

  create(req: RequestWorkingDays): Observable<any> {
    return this.http.post(`${API}/working-days`, req);
  }

  get(year: number, month: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString());

    return this.http.get(`${API}/working-days`, { headers, params });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${API}/working-days/${id}`, data);
  }
}
