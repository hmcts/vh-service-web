import { VideoWebService } from './video-web.service';
import { ApiClient, TokenResponse, ParticipantResponse } from '../../../services/clients/api-client';
import { of } from 'rxjs';

describe('VideoWebService', () => {

  let service: VideoWebService;
  const client = jasmine.createSpyObj<ApiClient>(['getToken', 'getParticipantsByUsername']);
  client.getToken.and.returnValue(of(new TokenResponse()));
  client.getParticipantsByUsername.and.returnValue(of(new ParticipantResponse()));

  service = new VideoWebService(client);

  it('should return token for participant Id', async () => {
    const token = await service.getToken('123456');
    expect(client.getToken).toHaveBeenCalled();
    expect(token).toBeTruthy();
  });
  it('should return participant Id', async () => {
    const participantResponse = await service.getCurrentParticipantId();
    expect(client.getParticipantsByUsername).toHaveBeenCalled();
    expect(participantResponse).toBeTruthy();
  });
});
