import { Routes } from '@angular/router';

import { MainLayout } from './core/layouts/main-layout/main-layout';

import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                component: Home,
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: Login
            },
            {
                path: 'signup',
                component: Signup
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];