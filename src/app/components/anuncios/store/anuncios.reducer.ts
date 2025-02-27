import { createReducer, on } from '@ngrx/store';
import * as fromAnunciosActions from './anuncios.actions';
import { IAnunciosState} from './anuncios.state';

export const initialState: IAnunciosState = {anuncios: [], anunciosSize: 0, isLoading:false};

export const _anunciosReducer = createReducer(
  initialState,
  on(fromAnunciosActions.loadAnuncios, (state) => ({ ...state, loading: true })),
  on(fromAnunciosActions.loadAnunciosSuccess, (state, { anuncios }) => ({
    ...state,
    anuncios: [...state.anuncios, ...anuncios],
    anunciosSize: anuncios.length == 0 ? state.anuncios.length : anuncios.length,
    loading: false,
  })),
  on(fromAnunciosActions.loadAnunciosFailure, (state, { error }) => {
    console.log(error);
    return ({
      ...state,
      loading: false
    });
  })
);
