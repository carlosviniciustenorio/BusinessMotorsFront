// anuncios.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import * as fromAnunciosActions from './anuncios.actions';
import { AnunciosState, initialState } from './anuncios.state';

const _anunciosReducer = createReducer(
  initialState,
  on(fromAnunciosActions.loadAnuncios, (state) => ({ ...state, loading: true })),
  on(fromAnunciosActions.loadAnunciosSuccess, (state, { anuncios }) => ({
    ...state,
    anuncios,
    loading: false,
  })),
  on(fromAnunciosActions.loadAnunciosFailure, (state, { error }) => ({
    ...state,
    loading: false,
  })),
  on(fromAnunciosActions.loadMoreAnuncios, (state) => ({
    ...state,
    loading: true,
  }))
);

export function anunciosReducer(state: AnunciosState | undefined, action: Action) {
  return _anunciosReducer(state, action);
}