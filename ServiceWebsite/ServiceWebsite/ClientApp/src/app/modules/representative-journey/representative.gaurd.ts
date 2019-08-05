import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Logger } from 'src/app/services/logger';

const RepresentativeUserType = 'Representative';
@Injectable({
  providedIn: 'root'
})
export class RepresentativeGuard implements CanActivate {
  constructor(
    private userProfileService: ProfileService,
    private router: Router,
    private logger: Logger) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    try {
      const profile = await this.userProfileService.getUserProfile();
      if (profile.role === RepresentativeUserType) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } catch (err) {
      this.logger.error(`Could not get user identity.`, err);
      this.router.navigate(['/logout']);
      return false;
    }
  }
}
