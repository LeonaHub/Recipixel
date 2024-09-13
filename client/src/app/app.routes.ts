import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent, data: { mode: 'register' } },
  { path: 'auth', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
