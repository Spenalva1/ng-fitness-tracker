import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private user: User = null;
  private user: User = {
    email: 'sp@gmail.com',
    userId: 'Math.round'
  };
  public authChange = new Subject<boolean>();

  constructor(
    private router: Router
  ) {}

  public registerUser(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  public login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  public logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  public getUser(): User {
    return { ...this.user };
  }

  public isAuth(): boolean {
    return this.user !== null;
  }
}
