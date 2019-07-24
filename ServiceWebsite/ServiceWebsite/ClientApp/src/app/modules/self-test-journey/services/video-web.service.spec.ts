import { VideoWebService } from './video-web.service';
import { ApiClient, TokenResponse } from '../../../services/clients/api-client';
import { of } from 'rxjs';

describe('VideoWebService', () => {

  let service: VideoWebService;
  const client = jasmine.createSpyObj<ApiClient>(['getToken','getParticipantsByUsername']);
  client.getToken.and.returnValue(of(new TokenResponse()));

  service = new VideoWebService(client);

  it('should return token for participant Id', async () => {
    const token = await service.getToken('123456');
    expect(client.getToken).toHaveBeenCalled();
    expect(token).toBeTruthy();
  });
});
