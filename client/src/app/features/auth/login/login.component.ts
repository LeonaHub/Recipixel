import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isLoginMode = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.data.subscribe(data => {
        this.isLoginMode = data['mode'] !== 'register';
      });
  }

  // Handle form submission
  // TODO: Implement actual login or signup logic
  onSubmit(formData: any) {
    console.log(this.isLoginMode ? 'Login:' : 'Signup:', formData);
  }

  // Toggle between login and register modes
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
