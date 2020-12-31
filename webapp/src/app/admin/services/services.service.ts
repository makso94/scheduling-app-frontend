import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';
import { ResponseService, ResponseServices } from '../models/services.models';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<ResponseServices> {
    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }))
    return this.http.get<ResponseServices>(`${API}/services`, { headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API}/services/${id}`);
  }

  create(formValues: any): Observable<any> {
    return this.http.post(`${API}/services/`, formValues);
  }
  update(formValues: any, id: any): Observable<any> {
    return this.http.put(`${API}/services/${id}`, formValues);
  }

  get(id: number): Observable<ResponseService> {
    return this.http.get<ResponseService>(`${API}/services/${id}`);
  }

}
