import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from './auth/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer';
import * as authActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authSub: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authSub = this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(userData => {
          this.store.dispatch(authActions.UserLogged(userData));
        });
        return;
      }

      if (this.authSub) {
        this.authSub.unsubscribe();
      }
      this.store.dispatch(authActions.UserLoggedOut());
    });
  }
}
