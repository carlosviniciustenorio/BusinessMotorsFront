import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAnuncios } from './store/anuncios.actions';
import { map } from 'rxjs/operators';
import { IAnunciosState } from './store/anuncios.state';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class AnunciosComponent implements OnInit {
  itemsPerPage = 10;
  currentPage = 0;
  loading = false;
  
  constructor(
    private router: Router,
    private store: Store<{ anuncios: IAnunciosState}>) { }
    
  anuncios$ = this.store.select('anuncios').pipe(
    map(e => e.anuncios)
  );

  ngOnInit() {
    this.store.dispatch(loadAnuncios({
      skip: this.currentPage * this.itemsPerPage,
      take: this.itemsPerPage,
    }));

    window.addEventListener('scroll', this.onScroll.bind(this));
  }


  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100) {
      this.loadMoreItems();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  navigateToAnuncio(id: string) {
    this.router.navigate(['/anuncio', id]);
  }

  loadMoreItems() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.store.dispatch(loadAnuncios({ skip: this.currentPage * this.itemsPerPage, take: this.itemsPerPage }));
  }
}
