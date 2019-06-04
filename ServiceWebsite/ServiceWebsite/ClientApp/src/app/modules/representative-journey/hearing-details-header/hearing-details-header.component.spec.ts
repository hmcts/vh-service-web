import { Hearing } from './../../base-journey/participant-suitability.model';
import { HearingDetailsHeaderComponent } from './hearing-details-header.component';
import { RepresentativeJourney } from '../representative-journey';
import { RepresentativeStepsOrderFactory } from '../representative-steps-order.factory';
import { MutableRepresentativeSuitabilityModel } from '../mutable-representative-suitability.model';

describe('HearingDetailsHeaderComponent', () => {
  const journey = new RepresentativeJourney(new RepresentativeStepsOrderFactory());
  const hearing = new Hearing('id', new Date(2029, 4, 3, 12, 30), 'case name', 'case number');
  let component: HearingDetailsHeaderComponent;

  beforeEach(() => {
    const suitability = new MutableRepresentativeSuitabilityModel();
    suitability.hearing = hearing;
    journey.forSuitabilityAnswers([suitability]);
    component = new HearingDetailsHeaderComponent(journey);
  });

  it('should format datetime and hearing data on load', () => {
    component.ngOnInit();

    expect(component.caseName).toBe(hearing.caseName);
    expect(component.caseNumber).toBe(hearing.caseNumber);
    expect(component.scheduledDate).toBe('3 May 2029');
    expect(component.scheduledTime).toBe('12:30');
  });
});
