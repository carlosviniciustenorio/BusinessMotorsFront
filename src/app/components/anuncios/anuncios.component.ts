import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {
  anuncios: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.buscarAnuncios();
  }

  buscarAnuncios() {
    this.apiService.getAnuncios(0, 10)
    .subscribe(
      (response) => {
        this.anuncios = response;
      },
      (error) => {
        console.error('Erro ao buscar anúncios:', error);
      }
    );
  }
}
