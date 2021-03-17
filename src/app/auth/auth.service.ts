import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User = null;
  public authChange = new Subject<boolean>();
  private isAuth = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  get _isAuth(): boolean {
    return this.isAuth;
  }

  public initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuth = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuth = false;
        this.authChange.next(false);
      }
    });
  }

  public async registerUser(authData: AuthData): Promise<void> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  public async login(authData: AuthData): Promise<void> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
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
