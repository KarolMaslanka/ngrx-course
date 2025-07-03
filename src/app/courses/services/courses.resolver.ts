import { Injectable } from "@angular/core";
import { CourseEntityService } from "./course-entity.service";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { filter, first, map, tap } from "rxjs/operators";
import { LessonsEntityService } from "./lesson-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean>{

  constructor(private coursesService: CourseEntityService,private lessonService: LessonsEntityService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.coursesService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.coursesService.getAll();
          }
          //this.lessonService.clearCache();
        }),
        filter(loaded => !!loaded),
        first()
      )

    //return this.coursesService.getAll()
    //  .pipe(
    //    map(courses => !!courses)
    //  );
  }


}
