import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  anuncios: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.buscarAnuncios();
  }

  buscarAnuncios() {
    this.apiService.getAnuncios(0,3)
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