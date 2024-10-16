import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAnuncios } from './store/anuncios.actions';
import { map, take } from 'rxjs/operators';
import { IAnunciosState } from './store/anuncios.state';
import { ApiService } from 'src/app/api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class AnunciosComponent implements OnInit, OnDestroy {
  private lastScrollTop: number = 0;
  itemsPerPage = 10;
  loading = false;
  marca: any | null = null;
  marcas: any[] = [];
  marcasFiltradas: any[] = [];
  marcasCache: any[] = [];
  modelos: any[] = [];
  versoes: any[] = [];
  marcaDescricao: string = '';

  filtros = {
    estado: '',
    precoInicio: null,
    precoFim: null,
    kmInicio: null,
    kmFim: null,
    anoModeloInicio: null,
    anoModeloFim: null,
    idMarca: null,
    idModelo: null,
    idVersao: null,
    cidade: ''
  };

  constructor(
    private router: Router,
    private store: Store<{ anuncios: IAnunciosState }>,
    private apiService: ApiService
  ) {}

  anuncios$ = this.store.select('anuncios').pipe(
    map((e) => e.anuncios)
  );

  ngOnInit() {
    this.carregarAnuncios();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const scrollTop = window.scrollY;
    const scrollPosition = window.innerHeight + scrollTop;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > this.lastScrollTop && scrollPosition >= documentHeight) {
      this.loadMoreItems();
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  navigateToAnuncio(id: string) {
    this.router.navigate(['/anuncio', id]);
  }

  loadMoreItems() {
    if (this.loading) return;

    this.loading = true;

    this.store.select('anuncios').pipe(
      map((state) => state.anunciosSize),
      take(1)
    ).subscribe((anunciosSize) => {
      this.store.dispatch(loadAnuncios({
        skip: anunciosSize,
        take: this.itemsPerPage,
        filters: this.filtros,
        ...this.filtros
      }));
      this.loading = false;
    });
  }

  onFocus() {
    this.carregarMarcas();
  }

  aplicarFiltros() {
    this.loadMoreItems();
  }

  carregarAnuncios() {
    this.anuncios$.pipe(
      take(1),
      tap((anuncios) => {
        if (!anuncios || anuncios.length === 0) {
          this.store.dispatch(loadAnuncios({
            skip: 0,
            take: this.itemsPerPage,
            filters: this.filtros,
            ...this.filtros
          }));
        }
      })
    ).subscribe();
  }
  

  carregarMarcas() {
    if (this.marcasCache.length == 0) {
      this.apiService.getMarcas(0, 50)
        .subscribe(
          (response) => {
            this.marcas = response;
            this.marcasCache = response;
            this.marcasFiltradas = response;
          },
          (error) => {
            console.error('Erro ao buscar marcas:', error);
          }
        );
    } else {
      this.marcas = this.marcasCache;
      this.marcasFiltradas = this.marcasCache;
    }
  }

  onMarcaInput() {
    const filterValue = this.marcaDescricao.toLowerCase();
    this.marcasFiltradas = this.marcas.filter(marca =>
      marca.descricao.toLowerCase().includes(filterValue)
    );
  }

  selectMarca(marca: any) {
    this.marca = marca;
    this.marcaDescricao = marca.descricao;
    const novosFiltros = { ...this.filtros, idMarca: marca.id };
    this.filtros = novosFiltros;
    this.marcasFiltradas = [];
    this.versoes = [];
    this.getModelos(this.marca.id);
  }

  getModelos(idMarca: number) {
    this.apiService.getModelosByMarca(0, 50, idMarca).subscribe(
      (response) => {
        this.modelos = response;
      },
      (error) => {
        console.error('Erro ao buscar modelos:', error);
      }
    );
  }

  onModeloChange(event: any) {
    const idModelo = event.target.value;
    const novosFiltros = { ...this.filtros, idModelo: event.target.value };
    this.filtros = novosFiltros;
    const modeloSelecionado = this.modelos.find(m => m.id === Number(idModelo));
    this.versoes = modeloSelecionado ? modeloSelecionado.versoes : [];
  }

  onVersaoChange(event: any) {
    const novosFiltros = { ...this.filtros, idVersao: event.target.value };
    this.filtros = novosFiltros;
  }
}
