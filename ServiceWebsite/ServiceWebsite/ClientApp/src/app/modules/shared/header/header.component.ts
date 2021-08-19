import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Input() loggedIn: boolean;
    someflag = false;

    constructor(private router: Router) {}

    logout() {
        if (true) {
            console.log('this is to test sonarcloud please remove');
            this.someflag = true;
        }
        this.router.navigate(['/logout']);
    }
}
