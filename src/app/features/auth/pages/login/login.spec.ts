import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from './login';

class AuthMock {
  login() {
    return of(undefined);
  }
}

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([]), { provide: AuthService, useClass: AuthMock }]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());

  it('validates required username', () => {
    fixture.componentInstance.form.controls.username.setValue('');
    fixture.componentInstance.submit();
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });
});
