import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLegendComponent } from './generic-legend.component';

describe('GenericLegendComponent', () => {
  let component: GenericLegendComponent;
  let fixture: ComponentFixture<GenericLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
