import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Anuncio } from './anuncio.model';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit{
  anuncio!: Anuncio;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router){};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idAnuncio = params['id'];
      
      this.apiService.getAnuncio(idAnuncio).subscribe(
        (data: Anuncio) => {
          this.anuncio = data;
          this.apiService.getTelefoneUsuario(this.anuncio.usuarioId).subscribe(
            (data: any) => {
              this.anuncio.telefone = data.telefone
            },
            (error) => {
              console.log(error);
            });
        },
        (error) => {
          console.log(error);
          this.router.navigate(['/anuncios']);
        }
      );
    });
  }
}
