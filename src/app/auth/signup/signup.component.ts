import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
