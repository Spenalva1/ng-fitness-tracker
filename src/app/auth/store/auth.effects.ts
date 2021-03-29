import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { AuthData } from '../auth-data.model';
import { User } from '../user.model';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

  LoginStart$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.LOGIN_START),
    switchMap(async (authData: AuthData) => {
      try {
        await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
        this.router.navigate(['']);
        return { type: authActions.AUTH_SUCCESS };
      } catch (error) {
        this.snack.open(error.message, null, {duration: 3000});
        return { type: authActions.AUTH_FAIL };
      }
    })
  ));

  SignupStart$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap(async (authData: AuthData) => {
      try {
        const { user } = await this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
        this.storeUserData({
          email: user.email,
          userId: user.uid,
          username: authData.username,
          photoURL: 'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
        });
        this.router.navigate(['']);
        return { type: authActions.AUTH_SUCCESS };
      } catch (error) {
        this.snack.open(error.message, null, {duration: 3000});
        return { type: authActions.AUTH_FAIL };
      }
    })
  ));

  Logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.LOGOUT),
    switchMap(async () => {
      try {
        await this.afAuth.signOut();
        this.router.navigate(['']);
      } catch (error) {
        this.snack.open(error.message, null, {duration: 3000});
      }
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  private storeUserData(user: User): void {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.userId}`);
    const data: User = {
      userId: user.userId,
      email: user.email,
      username: user.username,
      photoURL: user.photoURL,
    };
    userRef.set(data);
  }
}
