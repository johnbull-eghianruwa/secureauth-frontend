import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { SignupRequest } from '../../../core/models/signup-request';

import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
import { strongPasswordValidator } from '../../../shared/validators/strong-password.validator';

@Component({
    selector: 'app-signup',
    imports: [ ReactiveFormsModule, RouterLink ],
    templateUrl: './signup.html',
    styleUrl: './signup.scss'
})
export class Signup {

    private readonly fb = inject(FormBuilder);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    readonly signupForm = this.fb.group(
        {
            firstName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2)
                ]
            ],

            lastName: [
                '',
                [
                Validators.required,
                Validators.minLength(2)
                ]
            ],

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
                Validators.required,
                Validators.minLength(8),
                strongPasswordValidator()
                ]
            ],

            confirmPassword: [
                '',
                [
                Validators.required
                ]
            ]
        },
        {
            validators: passwordMatchValidator()
        }
    );

    get controls() {
        return this.signupForm.controls;
    }

    onSubmit(): void {

        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }

        const request: SignupRequest = {
            firstName: this.controls.firstName.value!,
            lastName: this.controls.lastName.value!,
            email: this.controls.email.value!,
            password: this.controls.password.value!,
            confirmPassword: this.controls.confirmPassword.value!
        };

        this.authService
        .signup(request)
        .subscribe({
            next: (response) => {

            console.log('Success:', response);

            alert(
                'Account created successfully. Please sign in.'
            );

            this.signupForm.reset();

            this.router.navigate(['/login']);

            },

            error: (error) => {

                console.error('Error:', error);

            alert(
                error.error?.message ??
                'Signup failed'
            );

            }
        });
    }

}