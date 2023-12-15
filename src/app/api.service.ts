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
    return this.http.get(`${this.apiUrl}/anuncios/getAll?take=${take}&skip=${skip}`);
  }

  getAnuncio(idAnuncio: string): Observable<Anuncio> {
    return this.http.get<Anuncio>(`${this.apiUrl}/anuncios?id=${idAnuncio}`);
  }

  postAnuncio(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/anuncios`, formData);
  }

}
