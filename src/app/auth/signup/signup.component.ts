import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public showPassword = false;
  public maxDate: Date;
  public loading = false;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => this.loading = authState.loading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(AuthActions.SignupStart({
      email: form.value.email,
      password: form.value.password,
      username: form.value.username
    }));
  }

}
