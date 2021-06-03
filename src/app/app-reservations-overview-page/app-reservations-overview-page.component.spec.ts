import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReservationsOverviewPageComponent } from './app-reservations-overview-page.component';

describe('AppReservationsOverviewPageComponent', () => {
  let component: AppReservationsOverviewPageComponent;
  let fixture: ComponentFixture<AppReservationsOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppReservationsOverviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReservationsOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
