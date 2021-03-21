import { createAction, props } from '@ngrx/store';
import { AuthData } from '../auth-data.model';

export const LOGIN_START = 'LOGIN_START';
export const SIGNUP_START = 'SIGNUP_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';

export const LoginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{
    email: string;
    userId: string;
    photoUrl: string;
    username: string;
  }>()
);

export const SignupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{
    email: string;
    userId: string;
    photoUrl: string;
    username: string;
  }>()
);

export const Logout = createAction(LOGOUT);

export const LoginStart = createAction(
  LOGIN_START,
  props<AuthData>()
);

export const SignupStart = createAction(
  SIGNUP_START,
  props<AuthData>()
);

export const AuthFail = createAction(
  AUTH_FAIL,
  props<{error: string}>()
);
