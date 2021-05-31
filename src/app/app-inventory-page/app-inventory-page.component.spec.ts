import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInventoryPageComponent } from './app-inventory-page.component';

describe('AppInventoryPageComponent', () => {
  let component: AppInventoryPageComponent;
  let fixture: ComponentFixture<AppInventoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInventoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInventoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
