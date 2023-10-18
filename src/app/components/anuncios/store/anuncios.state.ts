import { Anuncios } from '../anuncios.model';

export interface IAnunciosState {
  anuncios: Anuncios[];
  currentPage: number;
  isLoading: boolean;
}