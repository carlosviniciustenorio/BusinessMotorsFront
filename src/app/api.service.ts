import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './components/login/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5253/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAnuncios(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get(`${this.apiUrl}/anuncio/getAll?take=10&skip=0`, { headers });
  }
}
