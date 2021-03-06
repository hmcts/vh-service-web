import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checking-video-hearing',
    templateUrl: './checking-video-hearing.component.html',
    styles: []
})
export class CheckingVideoHearingComponent {
    constructor(private router: Router) {}

    continue() {
        this.router.navigate(['check-your-computer']);
    }
}
