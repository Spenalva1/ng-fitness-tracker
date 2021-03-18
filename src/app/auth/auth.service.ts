import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User = null;
  public authChange = new Subject<boolean>();
  private isAuth = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar
  ) {}

  get _isAuth(): boolean {
    return this.isAuth;
  }

  public initAuthListener(): Observable<User | any> {
    return this.afAuth.authState
    .pipe(
      tap(user => {
        if (user) {
          this.isAuth = true;
          this.authChange.next(true);
        } else {
          this.isAuth = false;
          this.authChange.next(false);
        }
      })
    );
  }

  public async registerUser(authData: AuthData): Promise<void> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  public async login(authData: AuthData): Promise<void> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  public logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  public getUser(): User {
    return { ...this.user };
  }
}
