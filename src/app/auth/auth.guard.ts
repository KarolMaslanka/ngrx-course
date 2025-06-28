import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedIn } from "./auth.selectors";
import {tap} from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  store = inject(Store);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigateByUrl('/login');
          }
        })
    )
  }

}
