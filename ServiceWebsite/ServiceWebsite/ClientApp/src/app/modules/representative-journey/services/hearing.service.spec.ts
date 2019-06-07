import { ApiClient } from 'src/app/services/clients/api-client';
import { HearingApiService } from './hearing.service';
import { of } from 'rxjs';

describe('HearingApiService', () => {
    it('maps values from server response', async () => {
        const response = {
            case_name: 'case name',
            case_type: 'case type',
            case_number: 'case number',
            scheduled_date_time: new Date(2019, 2, 12, 12, 45)
        };

        const api = jasmine.createSpyObj<ApiClient>(['getHearingById']);
        api.getHearingById.and.returnValue(of(response));

        const service = new HearingApiService(api);

        const hearing = await service.getHearing('id');
        expect(hearing.id).toBe('id');
        expect(hearing.caseName).toBe(response.case_name);
        expect(hearing.caseNumber).toBe(response.case_number);
        expect(hearing.caseType).toBe(response.case_type);
        expect(hearing.scheduledDateTime).toBe(response.scheduled_date_time);
    });
});
