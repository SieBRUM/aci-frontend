import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductFilterComponent } from './app-product-filter.component';

describe('AppProductFilterComponent', () => {
  let component: AppProductFilterComponent;
  let fixture: ComponentFixture<AppProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProductFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
