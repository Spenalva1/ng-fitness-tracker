import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';


export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user:  null,
  authError: null,
  loading: false
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.SignupStart , state => {
    return {
      ...state,
      authError: null,
      loading: true
    };
  }),

  on(AuthActions.LoginStart , state => {
    return {
      ...state,
      authError: null,
      loading: true
    };
  }),

  on(AuthActions.SignupSuccess , (state, action) => {
    const user = {
      username: action.userId,
      userId: action.userId,
      photoUrl: action.photoUrl,
      email: action.email,
    };
    return {
      ...state,
      loading: false,
      authError: null,
      user
    };
  }),

  on(AuthActions.LoginSuccess , (state, action) => {
    debugger
    const user = {
      username: action.userId,
      userId: action.userId,
      photoUrl: action.photoUrl,
      email: action.email,
    };
    return {
      ...state,
      loading: false,
      authError: null,
      user
    };
  }),

  on(AuthActions.Logout , state => {
    return {
      ...state,
      user: null
    };
  }),

  on(AuthActions.AuthFail , (state, action) => {
    return {
      ...state,
      loading: false,
      authError: action.error
    };
  }),
);

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
