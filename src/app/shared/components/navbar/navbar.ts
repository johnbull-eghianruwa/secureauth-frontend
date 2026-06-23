import { Component, inject } from '@angular/core';
import {
    Router,
    RouterLink,
    RouterLinkActive
} from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar {

    private readonly router = inject(Router);

    get user(): {
        firstName: string;
        lastName: string;
    } | null {

        const storedUser = localStorage.getItem('user');

        return storedUser
            ? JSON.parse(storedUser)
            : null;
    }

    logout(): void {

        localStorage.removeItem('user');

        this.router.navigate(['/login']);

    }

}