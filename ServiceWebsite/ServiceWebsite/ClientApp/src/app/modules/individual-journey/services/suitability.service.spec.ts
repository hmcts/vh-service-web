import { HearingSuitabilityResponse, HearingSuitabilityAnswer } from 'src/app/services/clients/api-client';
import { SuitabilityService } from './suitability.service';
import { ApiClient } from './../../../services/clients/api-client';
import { of } from 'rxjs';

describe('SuitabilityService', () => {
    const client = jasmine.createSpyObj<ApiClient>(['getUserSuitabilityAnswers', 'updateSuitabilityAnswers']);
    const service = new SuitabilityService(client);

    it('maps responses from api', async () => {
        // given some response from server
        client.getUserSuitabilityAnswers.and.returnValue(
            of([
                new HearingSuitabilityResponse({
                    hearing_id: '123',
                    participant_id: '456',
                    hearing_scheduled_at: new Date(),
                    questionnaire_not_required: false,
                    answers: []
                })
            ])
        );

        const result = await service.getAllSuitabilityAnswers();
        expect(result.length).toBe(1);
        expect(result[0].hearing.id).toBe('123');
        expect(result[0].participantId).toBe('456');
    });

    it('submits answers to api', async () => {
        client.updateSuitabilityAnswers.and.returnValue(of());
        await service.updateSuitabilityAnswers('123', []);
        expect(client.updateSuitabilityAnswers).toHaveBeenCalled();
    });
});
