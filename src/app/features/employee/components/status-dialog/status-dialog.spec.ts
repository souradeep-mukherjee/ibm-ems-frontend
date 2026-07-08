import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusDialogComponent } from './status-dialog';

describe('StatusDialogComponent', () => {
  let fixture: ComponentFixture<StatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatusDialogComponent] }).compileComponents();
    fixture = TestBed.createComponent(StatusDialogComponent);
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
