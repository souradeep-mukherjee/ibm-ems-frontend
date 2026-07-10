import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCheckIn } from './attendance-check-in';

describe('AttendanceCheckIn', () => {
  let component: AttendanceCheckIn;
  let fixture: ComponentFixture<AttendanceCheckIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceCheckIn],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceCheckIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
