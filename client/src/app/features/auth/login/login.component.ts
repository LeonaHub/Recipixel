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

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.isLoginMode = data['mode'] !== 'register';
    });
  }

  onSubmit(formData: any) {
    console.log(this.isLoginMode ? 'Login:' : 'Signup:', formData);
    // Handle login or signup logic
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
