import { HearingSuitabilityResponse } from 'src/app/services/clients/api-client';
import { RepresentativeSuitabilityService } from './representative-suitability.service';
import { ApiClient } from './../../../services/clients/api-client';
import { of } from 'rxjs';

describe('RepresentativeSuitabilityService', () => {
    const client = jasmine.createSpyObj<ApiClient>(['getUserSuitabilityAnswers', 'updateSuitabilityAnswers']);
    const service = new RepresentativeSuitabilityService(client);

    it('maps responses from api', async () => {
        // given some response from server
        client.getUserSuitabilityAnswers.and.returnValue(of([
            new HearingSuitabilityResponse({
                hearing_id: '123',
                participant_id: '456',
                hearing_scheduled_at: new Date(),
              questionnaire_not_required: false,
                answers: []
            })
        ]));

        const result = await service.getAllSuitabilityAnswers();
        expect(result.length).toBe(1);
        expect(result[0].hearing.id).toBe('123');
        expect(result[0].participantId).toBe('456');
    });

    it('submits answers to api', () => {
        const result = service.updateSuitabilityAnswers('123', []);
        expect(client.updateSuitabilityAnswers).toHaveBeenCalled();
      });
});
