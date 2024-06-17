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
  
  getAnuncios(skip: number, take: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.controllers[0]}?take=${take}&skip=${skip}`);
  }

  getAnuncio(idAnuncio: string): Observable<Anuncio> {
    return this.http.get<Anuncio>(`${this.apiUrl}/${this.controllers[0]}/${idAnuncio}`);
  }

  postAnuncio(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.controllers[0]}`, formData, {
      headers: this.getHeaders()
    });
  }

  getModelosByMarca(skip: number, take: number, id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[1]}?take=${take}&skip=${skip}&idMarca=${id}`,{
      headers: this.getHeaders()
    });
  }

  getMarcas(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[2]}?take=${take}&skip=${skip}`,{
      headers: this.getHeaders()
    });
  }

  getTiposCombustiveis(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[3]}?take=${take}&skip=${skip}`,{
      headers: this.getHeaders()
    });
  }

  getOpcionais(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[4]}?take=${take}&skip=${skip}`,{
      headers: this.getHeaders()
    });
  }

  getCaracteristicas(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[5]}?take=${take}&skip=${skip}`,{
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

}
