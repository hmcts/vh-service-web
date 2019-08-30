import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../modules/shared/models/user-profile.model';

@Injectable()
export class ProfileService {

  apiBaseUrl = '/api/profile/';

  profile: UserProfile;

  constructor(private httpClient: HttpClient) {
  }

  public get isLoggedIn(): boolean {
    return this.profile !== undefined;
  }

  public async getUserProfile(): Promise<UserProfile> {
    if (this.profile) {
      return this.profile;
    }

    const response: any = await this.httpClient.get(this.apiBaseUrl);
    this.profile = new UserProfile();
    this.profile.email = response.email;
    this.profile.role = response.role;
    return this.profile;
  }
}
