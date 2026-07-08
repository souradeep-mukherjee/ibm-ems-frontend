import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { StatusBadgeComponent } from './status-badge';

describe('StatusBadgeComponent', () => {
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatusBadgeComponent] }).compileComponents();
    fixture = TestBed.createComponent(StatusBadgeComponent);
    fixture.componentRef.setInput('status', EmploymentStatus.OnProbation);
    fixture.detectChanges();
  });

  it('formats status labels', () => expect(fixture.componentInstance.label()).toBe('ON PROBATION'));
});
