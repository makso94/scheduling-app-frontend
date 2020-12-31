import { TestBed } from '@angular/core/testing';

import { ToastrHandlerService } from './toastr-handler.service';

describe('ToastrHandlerService', () => {
  let service: ToastrHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
