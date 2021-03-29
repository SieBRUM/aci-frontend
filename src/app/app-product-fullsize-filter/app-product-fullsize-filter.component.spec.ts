import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProductFullsizeFilterComponent } from './app-product-fullsize-filter.component';

describe('AppProductFullsizeFilterComponent', () => {
  let component: AppProductFullsizeFilterComponent;
  let fixture: ComponentFixture<AppProductFullsizeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProductFullsizeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProductFullsizeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
