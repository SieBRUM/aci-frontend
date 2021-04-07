import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppArchiveDialogComponent } from './app-archive-dialog.component';

describe('AppArchiveDialogComponent', () => {
  let component: AppArchiveDialogComponent;
  let fixture: ComponentFixture<AppArchiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppArchiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppArchiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
