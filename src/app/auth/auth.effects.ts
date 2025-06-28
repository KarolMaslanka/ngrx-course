import { Injectable, inject } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  actions$ = inject(Actions);
  router = inject(Router);

  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.login),
        tap( action => localStorage.setItem('user', JSON.stringify(action.user))  
        )
    ),
    {dispatch: false}
  );

  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logout),
        tap( () => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
          }
        )
      ),
    { dispatch: false }
  );

  constructor() {
   
    //actions$.subscribe(action => {
    //  if (action.type === "[Login Page] User Login") {
    //    localStorage.setItem('user', JSON.stringify(action['user']));
    //  }
    //})

  }
 
}
