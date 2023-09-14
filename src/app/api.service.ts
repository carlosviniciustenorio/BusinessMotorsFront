import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './components/login/auth.service';
import { Observable } from 'rxjs';
import { Anuncio } from './components/anuncio/anuncio.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  getAnuncios(skip: number, take: number): Observable<any> {
    const headers = this.headers;
    return this.http.get(`${this.apiUrl}/anuncio/getAll?take=${take}&skip=${skip}`, { headers });
  }

  getAnuncio(idAnuncio: string): Observable<Anuncio> {
    const headers = this.headers;
    return this.http.get<Anuncio>(`${this.apiUrl}/anuncio?id=${idAnuncio}`, { headers });
  }
}
