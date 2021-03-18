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
  public loading = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  async onSubmit(form: FormGroup): Promise<void> {
    if (form.invalid) {
      return;
    }

    try {

      this.loading = true;

      await this.authService.login({
        email: form.value.email,
        password: form.value.password
      });
      this.loading = false;
    }
    catch (error) {
      this.loading = false;
    }

  }
}
