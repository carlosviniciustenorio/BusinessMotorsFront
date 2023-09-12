// anuncios.state.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

export class Anuncio {
  constructor(
    public id: string,
    public modelo: Modelo,
    public cambio: number,
    public cor: number,
    public km: string,
    public estado: string,
    public preco: number,
    public usuarioId: string,
    public exibirTelefone: boolean,
    public exibirEmail: boolean,
    public imagens: Imagem[]
  ) {}
}

export interface Modelo {
  id: number;
  descricao: string;
  anoModelo: number;
  anoFabricacao: number;
  marca: Marca;
  versao: Versao;
}

export interface Marca {
  id: number;
  descricao: string;
}

export interface Versao {
  id: number;
  descricao: string;
}

export class Imagem {
  constructor(public arn: string) {}
}

export interface AnunciosState {
  anuncios: Anuncio[];
  currentPage: number;
  loading: boolean;
}

export const initialState: AnunciosState = {
  anuncios: [],
  currentPage: 0,
  loading: false,
};

export const selectAnunciosState = createFeatureSelector<AnunciosState>('anuncios');

export const selectAnuncios = createSelector(
  selectAnunciosState,
  (state) => state.anuncios
);

export const selectCurrentPage = createSelector(
  selectAnunciosState,
  (state) => state.currentPage
);

export const selectLoading = createSelector(
  selectAnunciosState,
  (state) => state.loading
);
