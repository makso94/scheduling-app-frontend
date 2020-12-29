import { HttpClient, HttpParams } from '@angular/common/http';
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

    let params = new HttpParams();
    if (filter) {
      for (const key in filter) {
        if (key) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http.get<ResponseUsers>(`${API}/users`, { params });
  }

  create(user: User): Observable<any> {
    return this.http.post(`${API}/users`, user);
  }
}
