import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

import { LoginRequest } from '../../../core/models/login-request';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]
  });

  get controls() {
    return this.loginForm.controls;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = {
      email: this.controls.email.value!,
      password: this.controls.password.value!
    };

    this.authService
      .login(request)
      .subscribe({
        next: (response) => {

        localStorage.setItem(
            'user',
            JSON.stringify(response.user)
        );

        alert(
            `Welcome ${response.user.firstName}!`
        );

        this.router.navigate(['/']);

        },

        error: (error) => {

          alert(
            error.error?.message ??
            'Invalid email or password'
          );

        }
      });

  }

}
