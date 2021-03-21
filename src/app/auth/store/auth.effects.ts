import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { AuthData } from '../auth-data.model';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

  LoginStart$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap(async (authData: AuthData) => {
      try {
        await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
        this.router.navigate(['']);
      } catch (error) {
        return {
          type: authActions.AUTH_FAIL,
          action: error.message
        };
      }
    })
  ));

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}
}
