import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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

  isAuthenticated(): boolean {
    const token = this.getToken();
    // For mock API, always return true if token exists
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.token : null;
  }

  getRefreshToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.refreshToken : null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // No need for token refresh in mock API
}
