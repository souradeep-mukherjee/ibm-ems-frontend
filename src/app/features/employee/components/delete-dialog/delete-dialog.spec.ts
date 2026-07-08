import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteDialogComponent } from './delete-dialog';

describe('DeleteDialogComponent', () => {
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DeleteDialogComponent] }).compileComponents();
    fixture = TestBed.createComponent(DeleteDialogComponent);
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
