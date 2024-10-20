import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './components/login/auth.service';
import { Observable } from 'rxjs';
import { Anuncio } from './components/anuncio/anuncio.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://lb-tf-business-motors-407012790.us-east-1.elb.amazonaws.com/api';
  private controllers = ["anuncios", "modelos","marcas","tiposCombustiveis","opcionais","caracteristicas","usuarios"]
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  getAnuncios(skip: number, take: number, filtros: any = null): Observable<any> {
    let params = new HttpParams()
        .set('take', take.toString())
        .set('skip', skip.toString());

    for (let key in filtros) {
        if (filtros[key] !== null && filtros[key] !== undefined && filtros[key] !== '') {
            params = params.set(key, filtros[key]);
        }
    }

    return this.http.get(`${this.apiUrl}/${this.controllers[0]}`, { params });
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
    return this.http.get(`${this.apiUrl}/${this.controllers[1]}?take=${take}&skip=${skip}&idMarca=${id}`);
  }

  getMarcas(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[2]}?take=${take}&skip=${skip}`);
  }

  getTiposCombustiveis(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[3]}?take=${take}&skip=${skip}`);
  }

  getOpcionais(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[4]}?take=${take}&skip=${skip}`);
  }

  getCaracteristicas(skip: number, take: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[5]}?take=${take}&skip=${skip}`);
  }

  getUsuarioInfo(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.controllers[6]}/${id}/detalhes`);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

}
