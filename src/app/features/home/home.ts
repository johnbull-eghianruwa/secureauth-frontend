import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// import { Button } from '../../shared/ui/button/button';

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home {}
