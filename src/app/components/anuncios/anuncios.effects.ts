import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import * as fromAnunciosActions from './anuncios.actions';

@Injectable()
export class AnunciosEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    loadAnuncios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAnunciosActions.loadAnuncios),
            switchMap(({ skip, take }) =>
                this.apiService.getAnuncios(skip, take).pipe(
                    map((anuncios) =>
                        fromAnunciosActions.loadAnunciosSuccess({ anuncios })
                    ),
                    catchError((error) =>
                        of(fromAnunciosActions.loadAnunciosFailure({ error }))
                    )
                )
            )
        )
    );
}