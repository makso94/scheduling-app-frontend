import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API } from 'src/app/constants';
import { LoginResponseUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User);
  loggedUser$: Observable<User> = this.loggedUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(user: User): Observable<LoginResponseUser> {
    return this.http.put<LoginResponseUser>(`${API}/session`, user).pipe(
      tap(res => {
        this.loggedUserSubject.next(res.user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.delete(`${API}/session`)
      .pipe(
        // removes logged in user
        tap(() => {
          this.loggedUserSubject.next(new User);
        })
      );
  }

  loginCheck(): Observable<User> {
    const headers = new HttpHeaders()
      .set('X-Toastr-Meta', JSON.stringify({ exclude: [200, 403] }));
    return this.http.get<User>(`${API}/session`, { headers })
      .pipe(
        tap(user => {
          this.loggedUserSubject.next(user);
        }
        )
      );
  }


}
