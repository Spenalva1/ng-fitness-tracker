import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';


export interface State {
  user: User;
  loading: boolean;
}

const initialState: State = {
  user:  null,
  loading: false
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.UserLogged , (state, action) => {
    const user = {
      username: action.username,
      userId: action.userId,
      photoURL: action.photoURL,
      email: action.email,
    };
    return {
      ...state,
      user
    };
  }),

  on(AuthActions.UserLoggedOut , state => {
    return {
      ...state,
      user: null
    };
  }),

  on(AuthActions.SignupStart , state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(AuthActions.LoginStart , state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(AuthActions.AuthSuccess , state => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(AuthActions.AuthFail , (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
);

// tslint:disable-next-line: typedef
export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
