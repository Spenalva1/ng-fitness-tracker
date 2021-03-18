import { EventEmitter, Output, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  private isAuthSubs: Subscription;
  public authLoaded = false;
  public user: User;


  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthSubs = this.authService.user.subscribe(user => {
      this.user = user;
      this.authLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.isAuthSubs) {
      this.isAuthSubs.unsubscribe();
    }
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.onToggleSidenav();
    this.authService.logout();
  }

}
