import { Anuncios } from '../anuncios.model';

export interface IAnunciosState {
  anuncios: Anuncios[];
  anunciosSize: number;
  isLoading: boolean;
}