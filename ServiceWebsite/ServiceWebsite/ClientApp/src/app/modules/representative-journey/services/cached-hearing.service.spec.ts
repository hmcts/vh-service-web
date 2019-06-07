import { HearingDetails } from './hearing-details';
import { CachedHearingService } from './cached-hearing.service';
import { HearingService } from './hearing.service';

describe('CachedHearingService', () => {
    let service: HearingService;
    let wrappedService: jasmine.SpyObj<HearingService>;

    const someDate = new Date(2019, 2, 3, 15, 30);
    const hearingDetails = new HearingDetails('id', 'case name', 'case number', 'case type', someDate);

    beforeEach(() => {
        // ensure there are no old or interferring value in session storage
        sessionStorage.clear();

        wrappedService = jasmine.createSpyObj<HearingService>(['getHearing']);
        service = new CachedHearingService(wrappedService);
    });

    it('reads value from session storage on second try', async () => {
        // given we have got the value once
        wrappedService.getHearing.and.returnValue(Promise.resolve(hearingDetails));
        const firstResult = await service.getHearing('id');

        // and it would throw error on second attempt
        wrappedService.getHearing.and.throwError('Should not get called');

        // when we get it the 2nd time
        const secondResult = await service.getHearing('id');

        // then it is the same
        expect(JSON.stringify(firstResult)).toBe(JSON.stringify(secondResult));
    });

    it('reads new value from service for different id', async () => {
        // given service returns a hearing with given id
        wrappedService.getHearing.and.callFake((id: string) => {
            return Promise.resolve(
                new HearingDetails(id, 'case name', 'case number', 'case type', someDate)
            );
        });

        // and we call it twice
        const firstResult = await service.getHearing('id1');
        const secondResult = await service.getHearing('id2');

        // then each result has proper response
        expect(firstResult.id).toBe('id1');
        expect(secondResult.id).toBe('id2');
    });
});
