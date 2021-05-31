import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddProductPageComponent } from './app-add-product-page.component';

describe('AppAddProductPageComponent', () => {
  let component: AppAddProductPageComponent;
  let fixture: ComponentFixture<AppAddProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAddProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
