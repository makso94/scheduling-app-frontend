import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.put(`${API}/session`, user);
  }

  logout(): Observable<any> {
    return this.http.delete(`${API}/session`);
  }

  loginCheck(): Observable<User> {
    return this.http.get<User>(`${API}/session`);
  }


}
