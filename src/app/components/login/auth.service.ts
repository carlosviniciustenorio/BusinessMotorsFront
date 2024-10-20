import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { AuthResponse } from './auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://lb-tf-business-motors-407012790.us-east-1.elb.amazonaws.com/api';
  private token: string | null = null;
  isAuthenticated = false;

  constructor(private http: HttpClient) {}
  loginEvent = new Subject<void>();
  logoutEvent = new Subject<void>();

  login(credentials: { email: string, senha: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/usuarios/login`, credentials)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.sucesso) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.loginEvent.next();
          }
        })
      );
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('accessToken');
    }
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('accessToken');
    this.logoutEvent.next();
  }

  setAuthenticated(isAuth: boolean) {
    this.isAuthenticated = isAuth;
  }

  validateToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenData.exp > currentTime) {
        console.log('Token válido');
        this.isAuthenticated = true;
        return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }
}
