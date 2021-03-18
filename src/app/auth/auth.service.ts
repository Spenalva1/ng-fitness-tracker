import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new Observable<User>(null);

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private snackbar: MatSnackBar
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  public async registerUser(authData: AuthData): Promise<void> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
      this.updateUserData({
        email: user.email,
        userId: user.uid,
        username: authData.username,
        photoURL: 'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
      });
      this.router.navigate(['/']);
    } catch (error) {
      this.snackbar.open(error.message, null, {duration: 3500});
    }
  }

  public async login(authData: AuthData): Promise<void> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
      this.router.navigate(['/']);
    } catch (error) {
      this.snackbar.open(error.message, null, {duration: 3500});
    }
  }

  private updateUserData(user: User): void {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.userId}`);
    const data: User = {
      userId: user.userId,
      email: user.email,
      username: user.username,
      photoURL: user.photoURL,
    };
    userRef.set(data);
  }

  public async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.log('Error ->', error);
    }
  }
}
