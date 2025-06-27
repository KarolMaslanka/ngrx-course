import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
    user: User
}

export const initialState: AuthState = {
  user: undefined
}

//export const reducers: ActionReducerMap<AuthState> = {

//};

//export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];

export const authReducer = createReducer(

  initialState,

  on(AuthActions.login, (state, action) => {
      return {
        user: action.user
      }
    }
  )
);
