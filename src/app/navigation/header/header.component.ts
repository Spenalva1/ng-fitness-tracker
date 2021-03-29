import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  private authSubs: Subscription;
  public user: User;
  public authLoaded = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authSubs = this.store.select('auth').subscribe(authState => {
      this.user = authState.user,
      this.authLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void{
    this.store.dispatch(AuthActions.Logout());
  }

}
