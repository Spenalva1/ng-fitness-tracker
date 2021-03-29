import { createAction, props } from '@ngrx/store';
import { AuthData } from '../auth-data.model';
import { User } from '../user.model';

export const LOGIN_START = 'LOGIN_START';
export const SIGNUP_START = 'SIGNUP_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const USER_LOGGED = 'USER_LOGGED';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const LOGOUT = 'LOGOUT';

export const AuthSuccess = createAction(AUTH_SUCCESS);

export const Logout = createAction(LOGOUT);

export const LoginStart = createAction(LOGIN_START, props<AuthData>());

export const SignupStart = createAction(SIGNUP_START, props<AuthData>());

export const AuthFail = createAction(AUTH_FAIL);

export const UserLogged = createAction(USER_LOGGED, props<User>());

export const UserLoggedOut = createAction(USER_LOGGED_OUT);
