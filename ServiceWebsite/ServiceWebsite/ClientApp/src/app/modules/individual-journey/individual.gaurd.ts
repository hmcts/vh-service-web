import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Logger } from 'src/app/services/logger';

const IndividualUserType = 'Individual';
@Injectable({
    providedIn: 'root'
})
export class IndividualGuard implements CanActivate {
    constructor(private userProfileService: ProfileService, private router: Router, private logger: Logger) {}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            const profile = await this.userProfileService.getUserProfile();
            if (profile.role === IndividualUserType) {
                return true;
            } else {
                this.router.navigate(['/unauthorised']);
                return false;
            }
        } catch (err) {
            this.logger.error(`Could not get user identity.`, err);
            this.router.navigate(['/logout']);
            return false;
        }
    }
}
