import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdalService } from 'adal-angular4';
import { LoggerService } from '../services/logger.service';
import { ReturnUrlService } from '../services/return-url.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logger: LoggerService,
    private returnUrlService: ReturnUrlService,
    private adalSvc: AdalService) { }

  ngOnInit() {
    if (this.adalSvc.userInfo.authenticated) {
      const returnUrl = this.returnUrlService.popUrl() || '/';
      try {
        this.router.navigateByUrl(returnUrl);
      } catch (e) {
        this.logger.error('Failed to navigate to redirect url, possibly stored url is invalid', e, returnUrl);
        this.router.navigate(['/']);
      }
    } else {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.returnUrlService.setUrl(returnUrl);
      this.adalSvc.login();
    }
  }
}
