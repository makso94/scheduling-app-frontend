import { TestBed } from '@angular/core/testing';

import { ToastrInterceptorService } from './toastr-interceptor.service';

describe('ToastrInterceptorService', () => {
  let service: ToastrInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
