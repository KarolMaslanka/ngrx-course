import { createReducer, on } from "@ngrx/store";
import { Course } from "../model/course";
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { CourseActions } from "../action-types";

export const coursesFeatureKey = 'courses';
export interface CoursesState extends EntityState<Course> { }

export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCourseState,
  on(CourseActions.allCoursesLoaded, (state, action) => 
     adapter.setAll(action.courses, state)
  )
)
