import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDaysListComponent } from './working-days-list.component';

describe('WorkingDaysListComponent', () => {
  let component: WorkingDaysListComponent;
  let fixture: ComponentFixture<WorkingDaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingDaysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
