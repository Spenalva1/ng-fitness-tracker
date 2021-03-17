import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  public isAuth: boolean;
  private isAuthSubs: Subscription;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService._isAuth;
    this.isAuthSubs = this.authService.authChange.subscribe(auth => this.isAuth = auth);
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
