import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCheckOut } from './attendance-check-out';

describe('AttendanceCheckOut', () => {
  let component: AttendanceCheckOut;
  let fixture: ComponentFixture<AttendanceCheckOut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceCheckOut],
    }).compileComponents();

    fixture = TestBed.createComponent(AttendanceCheckOut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
