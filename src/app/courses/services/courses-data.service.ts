import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Update } from "@ngrx/entity";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course>{

  constructor(http: HttpClient, httpUlrGenerator: HttpUrlGenerator) {

    super('Courses', http, httpUlrGenerator);

  }

  getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(
        map(courses => courses['payload'])
      );
  }

  update(course: Update<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/course/${course.id}`,course.changes)
  }


}
