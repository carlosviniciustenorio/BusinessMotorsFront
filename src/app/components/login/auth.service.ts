import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from './auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, senha: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/usuarios/login`, credentials)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.sucesso) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
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
  }
}
