import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';
import { ResponseUsers, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(filter?: any): Observable<ResponseUsers> {

    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200] }));

    let params = new HttpParams();
    if (filter) {
      for (const key in filter) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http.get<ResponseUsers>(`${API}/users`, { params, headers });
  }

  create(user: User): Observable<any> {
    return this.http.post(`${API}/users`, user);
  }

  approve(id: number): Observable<any> {
    return this.http.get(`${API}/users/${id}/approve`);
  }

  deactive(id: number): Observable<any> {
    return this.http.get(`${API}/users/${id}/deactive`);
  }
}
