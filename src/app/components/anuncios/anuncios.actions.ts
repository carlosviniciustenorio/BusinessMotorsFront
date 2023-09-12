import { createAction, props } from '@ngrx/store';
import { Anuncio } from './anuncios.state';

export const loadAnuncios = createAction(
    '[Anuncios] Load Anuncios',
    props<{ skip: number; take: number }>()
  );
export const loadAnunciosSuccess = createAction(
  '[Anuncios] Load Anuncios Success',
  props<{ anuncios: Anuncio[] }>()
);
export const loadAnunciosFailure = createAction(
  '[Anuncios] Load Anuncios Failure',
  props<{ error: any }>()
);

export const loadMoreAnuncios = createAction('[Anuncios] Load More Anuncios', props<{skip: number, take: number}>());
