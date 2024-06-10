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
  private controllers = ["anuncios", "modelos","marcas","tiposCombustiveis","opcionais","caracteristicas"]
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  getAnuncios(skip: number, take: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.controllers[0]}/getAll?take=${take}&skip=${skip}`);
  }

  getAnuncio(idAnuncio: string): Observable<Anuncio> {
    return this.http.get<Anuncio>(`${this.apiUrl}/${this.controllers[0]}?id=${idAnuncio}`);
  }

  postAnuncio(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.controllers[0]}`, formData);
  }

  getModelosByMarca(skip: number, take: number, id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[1]}/getAll?take=${take}&skip=${skip}&idMarca=${id}`);
  }

  getMarcas(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[2]}/getAll?take=${take}&skip=${skip}`);
  }

  getTiposCombustiveis(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[3]}/getAll?take=${take}&skip=${skip}`);
  }

  getOpcionais(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[4]}/getAll?take=${take}&skip=${skip}`);
  }

  getCaracteristicas(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[5]}/getAll?take=${take}&skip=${skip}`);
  }

}
