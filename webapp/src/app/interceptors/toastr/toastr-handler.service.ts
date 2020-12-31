import { Injectable } from '@angular/core';
import { includes } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ToastrMeta } from './toastr.model';

@Injectable({
  providedIn: 'root'
})
export class ToastrHandlerService {

  toastrSubject = new Subject<ToastrMeta>();
  responseToatrs = this.toastrSubject.asObservable().pipe(
    filter(item => {
      return !includes(item.params.exclude, +item.response?.status);
    })

  ).subscribe(toastrMeta => {
    console.log(toastrMeta);
    console.log(toastrMeta.response.status);

    if (Math.floor(toastrMeta.response.status / 100) === 2) {
      this.toastrService.success(toastrMeta.response.body?.msg);
    }
    else if (Math.floor(toastrMeta.response.status / 100) === 4) {
      this.toastrService.error(toastrMeta.response.error?.msg);
    }
    else if (Math.floor(toastrMeta.response.status / 100) === 5) {
      this.toastrService.error('Server Error');
    }
  });


  constructor(private toastrService: ToastrService) { }



  handle(toastrMeta: ToastrMeta): void {
    toastrMeta.params.exclude = JSON.parse(toastrMeta.request.headers.get('x-toastr-meta') || '{"exclude": []}').exclude;
    this.toastrSubject.next(toastrMeta);
  }
}
