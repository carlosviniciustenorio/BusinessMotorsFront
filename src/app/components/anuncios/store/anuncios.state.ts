import { Anuncio } from '../../anuncio/anuncio.model';

export interface IAnunciosState {
  anuncios: Anuncio[];
  currentPage: number;
  isLoading: boolean;
}