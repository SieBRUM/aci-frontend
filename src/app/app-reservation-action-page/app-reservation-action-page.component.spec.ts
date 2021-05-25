import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReservationActionPageComponent } from './app-reservation-action-page.component';

describe('AppReservationActionPageComponent', () => {
  let component: AppReservationActionPageComponent;
  let fixture: ComponentFixture<AppReservationActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppReservationActionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReservationActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
