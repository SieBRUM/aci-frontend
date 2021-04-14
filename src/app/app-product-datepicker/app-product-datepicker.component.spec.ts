import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductDatepickerComponent } from './app-product-datepicker.component';

describe('AppProductDatepickerComponent', () => {
  let component: AppProductDatepickerComponent;
  let fixture: ComponentFixture<AppProductDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProductDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProductDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
