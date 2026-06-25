import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignupRequest } from '../models/signup-request';
import { SignupResponse } from '../models/signup-response';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = 'http://localhost:3000/api';

    signup(
        request: SignupRequest
    ): Observable<SignupResponse> {

        return this.http.post<SignupResponse>(
            `${this.apiUrl}/auth/signup`,
            request
        );

    }

    login(
        request: LoginRequest
    ): Observable<LoginResponse> {

        return this.http.post<LoginResponse>(
            `${this.apiUrl}/auth/login`,
            request
        );
    }
}