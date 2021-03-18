import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  private isAuthSubs: Subscription;
  public user: User;
  public authLoaded = false;

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

  onLogout(): void{
    this.authService.logout();
  }

}
