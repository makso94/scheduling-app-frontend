import { TestBed } from '@angular/core/testing';

import { WorkingDaysService } from './working-days.service';

describe('WorkingDaysService', () => {
  let service: WorkingDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
