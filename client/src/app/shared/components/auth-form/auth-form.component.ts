import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})

export class AuthFormComponent {
  @Input() isLoginMode = true;
  @Output() formSubmit = new EventEmitter<any>();


  form: FormGroup;
  googleIconPath = 'assets/google_icon.png';

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  togglePasswordVisibility(field: string) {
    const input = document.querySelector(`input[formControlName="${field}"]`) as HTMLInputElement;
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
}
