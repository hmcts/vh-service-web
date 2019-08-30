import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { of } from 'rxjs';

describe('ProfileService', () => {
  let client: jasmine.SpyObj<HttpClient>;
  let service: ProfileService;

  const serviceResponse = {
    email: 'email',
    role: 'role'
  };

  beforeAll(() => {
    client = jasmine.createSpyObj<HttpClient>(['get']);
    client.get.and.returnValue(Promise.resolve(serviceResponse));

    service = new ProfileService(client);
  });

  it('user is not logged in until profile is loaded', async () => {
    expect(service.isLoggedIn).toBe(false);
    await service.getUserProfile();
    expect(service.isLoggedIn).toBe(true);
  });

  it('maps role and email to profile', async () => {
    const profile = await service.getUserProfile();
    expect(profile.email).toBe(serviceResponse.email);
    expect(profile.role).toBe(serviceResponse.role);
  });
});
