import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showPassword = false;
  public loading = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => this.loading = authState.loading);
  }

  async onSubmit(form: FormGroup): Promise<void> {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(AuthActions.LoginStart({
      email: form.value.email,
      password: form.value.password
    }));
  }
}
