import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // Replace with actual API URL
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.token : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap(response => this.handleAuthentication(response))
    );
  }

  private handleAuthentication(response: any) {
    if (response && response.token) {
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.currentUserSubject.next(response);
    }
  }





















  /*

  login(username: string, password: string) {
    return this.http.post<any>('api/login', { username, password }).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }



  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post<any>('api/register', { username, email, password })
      .pipe(
        map((response) => {
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>('api/refresh-token', { refreshToken }).pipe(
      map((response) => {
        if (response && response.token) {
          const currentUser = this.currentUserValue;
          currentUser.token = response.token;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
        }
        return response;
      })
    );
  }

  getRefreshToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.refreshToken : null;
  } */

  // No need for token refresh in mock API
}
