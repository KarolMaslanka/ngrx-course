import { createReducer, on } from "@ngrx/store";
import { Course, compareCourses } from "../model/course";
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { CourseActions } from "../action-types";

export const coursesFeatureKey = 'courses';
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCourseState,
  on(CourseActions.allCoursesLoaded, (state, action) => 
    adapter.setAll(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdate,
    (state, action) => {
      return adapter.updateOne(action.update, state)
    })
)

export const selectAll = adapter.getSelectors().selectAll;
