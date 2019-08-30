import {ProfileService} from './profile.service';
import {Logger} from './logger';
import {ApiClient} from './clients/api-client';
import {UserProfile} from '../modules/shared/models/user-profile.model';
import {of} from 'rxjs';

describe('ProfileService', () => {
  let apiClient: jasmine.SpyObj<ApiClient>;
  let logger: jasmine.SpyObj<Logger>;
  let service: ProfileService;

  const response = new UserProfile();
  response.email = 'email';
  response.role = 'role';

  beforeAll(() => {
    apiClient = jasmine.createSpyObj<ApiClient>(['getUserProfile']);
    logger = jasmine.createSpyObj<Logger>(['error']);
    apiClient.getUserProfile.and.returnValue(of(response));

    service = new ProfileService(apiClient, logger);
  });

  it('user is not logged in until profile is loaded', async () => {
    expect(service.isLoggedIn).toBe(false);
    await service.getUserProfile();
    expect(service.isLoggedIn).toBe(true);
  });

  it('returns profile', async () => {
    let profile = await service.getUserProfile();
    expect(profile.email).toBe(response.email);
    expect(profile.role).toBe(response.role);
    profile = await service.getUserProfile();
    expect(profile.email).toBe(response.email);
    expect(profile.role).toBe(response.role);

    expect(apiClient.getUserProfile).toHaveBeenCalledTimes(1);
  });

  it('returns profile that has been set by previous call', async () => {
    const profile = await service.getUserProfile();
    expect(profile.email).toBe(response.email);
    expect(profile.role).toBe(response.role);
  });

  it('returns empty profile when response from api undefined', async () => {
    apiClient.getUserProfile.and.returnValue(of(undefined));
    service.profile = undefined;
    const profile = await service.getUserProfile();
    expect(profile.email).toBeUndefined();
    expect(profile.role).toBeUndefined();
  });

  it('logs error when api client throws', async () => {
    apiClient.getUserProfile.and.throwError('something');
    service.profile = undefined;
    const profile = await service.getUserProfile();
    expect(logger.error).toHaveBeenCalled();
  });
});
