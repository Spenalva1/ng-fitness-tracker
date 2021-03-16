import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public showPassword = false;
  public maxDate: Date;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }

    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
