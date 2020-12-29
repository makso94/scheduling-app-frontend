import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { CanActivateChild, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivateChild(): Observable<boolean> {
    return this.authService.loginCheck().pipe(
      map((res) => {
        // console.log(res);
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
