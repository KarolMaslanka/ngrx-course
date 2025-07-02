import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap, filter } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;
  store = inject(Store<AppState>);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
          if (!this.loading && !coursesLoaded) {
            this.loading = true;
            this.store.dispatch(loadAllCourses())
          }
        }
        ),
        filter(coursesLoaded => coursesLoaded),
        first(),
        finalize(() => { this.loading = false; })
    )
  }

}
