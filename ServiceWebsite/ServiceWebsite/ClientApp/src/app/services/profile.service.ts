import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../models/user-profile.model';
import { ErrorService } from './error.service';

@Injectable()
export class ProfileService {

  apiBaseUrl = '/api/profile/';

  profile: UserProfile;

  constructor(private httpClient: HttpClient, private errorService: ErrorService) {
  }

  public get isLoggedIn(): boolean {
    return this.profile !== undefined;
  }

  public async getUserProfile(): Promise<UserProfile> {
    if (this.profile) {
      return this.profile;
    }

    const response: any = await this.httpClient.get(this.apiBaseUrl).toPromise();
    this.profile = new UserProfile();
    this.profile.email = response.email;
    this.profile.role = response.role;
    return this.profile;
  }
}
