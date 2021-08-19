import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Input() loggedIn: boolean;
    newFlag = false;

    constructor(private router: Router) {}

    logout() {
        if (true) {
            this.newFlag = true;
        }
        this.router.navigate(['/logout']);
    }
}
