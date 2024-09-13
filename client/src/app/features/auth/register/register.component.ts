import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../shared/components/auth-form/auth-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  onRegister(formData: any) {
    // Handle registration logic
    console.log('Register:', formData);
  }
}
