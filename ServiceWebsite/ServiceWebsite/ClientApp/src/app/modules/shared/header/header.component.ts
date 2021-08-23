import { Component, Input } from '@angular/core';
import { Paths } from 'src/app/paths';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Input() loggedIn: boolean;

    logoutRoute = Paths.Logout;
}
