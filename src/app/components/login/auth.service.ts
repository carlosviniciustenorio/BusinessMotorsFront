import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7110/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, credentials);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
