import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.actions";

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;
  store = inject(Store<AppState>);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        tap((val) => {
          if (!this.loading) {
            this.loading = true;
            this.store.dispatch(loadAllCourses())
          }
        }
        ),
        first(),
        finalize(() => { this.loading = false; })
    )
  }

}
