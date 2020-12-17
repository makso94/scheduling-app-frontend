import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get(`${API}/services`)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API}/services/${id}`);
  }

  create(formValues: any): Observable<any> {
    return this.http.post(`${API}/services/`, formValues);
  }

}
