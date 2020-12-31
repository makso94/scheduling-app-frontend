import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { ToastrHandlerService } from './toastr-handler.service';
import { ToastrMeta } from './toastr.model';

@Injectable({
  providedIn: 'root'
})
export class ToastrInterceptorService implements HttpInterceptor {

  constructor(private toastrHandlerService: ToastrHandlerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const toastrMeta = new ToastrMeta()
    toastrMeta.request = req;

    return next.handle(req)
      .pipe(
        filter(res => res instanceof HttpResponse),
        tap(res => {
          if (res instanceof HttpResponse) {
            toastrMeta.response = res;
            // this.toastrService.success(res?.body?.msg);
            this.toastrHandlerService.handle(toastrMeta);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          toastrMeta.response = err;
          this.toastrHandlerService.handle(toastrMeta);
          throw err;
        }),
      );

  }
}
