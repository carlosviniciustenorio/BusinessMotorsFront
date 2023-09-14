import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAnunciosState } from "./anuncios.state";

export const selectAnunciosState = createFeatureSelector<IAnunciosState>('anuncios');

export const selectAnuncios = createSelector(
  selectAnunciosState,
  (state: IAnunciosState) => state.anuncios
);

// export const selectCurrentPage = createSelector(
//   selectAnunciosState,
//   (state) => state.currentPage
// );

export const selectLoading = createSelector(
  selectAnunciosState,
  (state: IAnunciosState) => state.isLoading
);