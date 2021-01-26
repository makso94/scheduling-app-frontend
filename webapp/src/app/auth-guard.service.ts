import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { CanActivateChild, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { User } from './auth/models/user.model';
import { isNil } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.loginCheck()
      .pipe(
        map(user => {
          if (isNil(user.approved_at)) {
            this.router.navigate(['/not-approved']);
            return false;
          }
          console.log('tuj ne treba da dovadja');

          return user.is_admin === route.data?.role ? true : false;
        }),
        catchError(() => of(false))
      )
  }

}
