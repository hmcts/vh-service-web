import { ThankYouComponent } from './thank-you.component';
import { RepresentativeJourneyService } from '../../services/representative.journey.service';
import { ParticipantSuitabilityModel, Hearing } from '../../../base-journey/participant-suitability.model';

describe('ThankYouComponent', () => {
    it('should on init get hearing details', () => {
        let representativeJourneyServiceSpy = jasmine.createSpyObj<RepresentativeJourneyService>('RepresentativeJourneyService', ['get']);
        let currentModel = new ParticipantSuitabilityModel();
        const date = new Date('12 12 2020');

        currentModel.hearing = new Hearing(
            '12345',
            date,
            null,
            null,
            false
        );
        representativeJourneyServiceSpy.get.and.returnValue(currentModel);
        const component = new ThankYouComponent(representativeJourneyServiceSpy);

        component.ngOnInit();

        expect(representativeJourneyServiceSpy.get).toHaveBeenCalled();
      
  });
});
