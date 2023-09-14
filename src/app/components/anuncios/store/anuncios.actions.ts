import { createAction, props } from '@ngrx/store';
import { Anuncio } from '../../anuncio/anuncio.model';

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
