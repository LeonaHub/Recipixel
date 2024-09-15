import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';

interface AuthForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  @Input() isLoginMode = true;
  // Output event emitter to send form data to parent component
  @Output() formSubmit = new EventEmitter<any>();

  private router = inject(Router);
  form: FormGroup<AuthForm>;
  googleIconPath = 'assets/google_icon.png';

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  // Private method to create and return the form group
  private createForm(): FormGroup<AuthForm> {
    return this.fb.group<AuthForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  togglePasswordVisibility(field: string) {
    const input = document.querySelector(
      `input[formControlName="${field}"]`
    ) as HTMLInputElement;
    const eyeIcon = input.nextElementSibling as HTMLElement;

    if (input.type === 'password') {
      input.type = 'text';
      eyeIcon.classList.replace('bx-hide', 'bx-show');
    } else {
      input.type = 'password';
      eyeIcon.classList.replace('bx-show', 'bx-hide');
    }
  }

  onToggleMode() {
    const newRoute = this.isLoginMode ? '/register' : '/login';
    this.router.navigate([newRoute]);
  }


  // Custom validator to check if password and confirm password match
  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }


  // Method to handle form submission
  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      if (this.isLoginMode) {
        this.login();
      } else {
        this.register();
      }
    } else {
      this.showValidationErrors();
    }
  }

  private login() {
    // TODO: Handle login logic
    console.log('Logging in...', this.form.value);
    // TODO: JWT service logic for login
  }

  private register() {
    // TODO: Handle register logic
    console.log('Signing up...', this.form.value);
    // TODO: JWT service logic for register
  }

  private showValidationErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }
}
