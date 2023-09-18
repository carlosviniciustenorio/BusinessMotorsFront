import { createAction, props } from '@ngrx/store';
import { Anuncios } from '../anuncios.model';

export const loadAnuncios = createAction(
    '[Anuncios] Load Anuncios',
    props<{ skip: number; take: number }>()
  );
export const loadAnunciosSuccess = createAction(
  '[Anuncios] Load Anuncios Success',
  props<{ anuncios: Anuncios[] }>()
);
export const loadAnunciosFailure = createAction(
  '[Anuncios] Load Anuncios Failure',
  props<{ error: any }>()
);
