import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadAnuncios } from './store/anuncios.actions';
import { map, take } from 'rxjs/operators';
import { IAnunciosState } from './store/anuncios.state';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css'],
})
export class AnunciosComponent implements OnInit {
  private lastScrollTop: number = 0;
  itemsPerPage = 10;
  loading = false;
  
  constructor(
    private router: Router,
    private store: Store<{ anuncios: IAnunciosState}>) { }
    
  anuncios$ = this.store.select('anuncios').pipe(
    map(e => e.anuncios)
  );

  ngOnInit() {
    this.store.select('anuncios').pipe(
      map(state => state.anunciosSize),
      take(1)
    ).subscribe(anunciosSize => {
      this.store.dispatch(loadAnuncios({
        skip: anunciosSize,
        take: this.itemsPerPage
      })
    );
    });
  
    window.addEventListener('scroll', this.onScroll.bind(this));
  }


  onScroll() {
    const scrollTop = window.scrollY;
    const scrollPosition = window.innerHeight + scrollTop;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > this.lastScrollTop && scrollPosition >= documentHeight) {
      this.loadMoreItems();
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para evitar valores negativos
  }
  

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  navigateToAnuncio(id: string) {
    this.router.navigate(['/anuncio', id]);
  }

  loadMoreItems() {
    if (this.loading)
      return;
    
    this.loading = true;
    
    this.store.select('anuncios').pipe(
      map(state => state.anunciosSize),
      take(1)
    ).subscribe(anunciosSize => {
      this.store.dispatch(loadAnuncios({
        skip: anunciosSize,
        take: this.itemsPerPage
      }));
      this.loading = false;
    });
  }
  
}
