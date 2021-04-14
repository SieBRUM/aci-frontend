import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppShoppingCartPageComponent } from './app-shopping-cart-page.component';

describe('AppShoppingCartPageComponent', () => {
  let component: AppShoppingCartPageComponent;
  let fixture: ComponentFixture<AppShoppingCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppShoppingCartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShoppingCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
