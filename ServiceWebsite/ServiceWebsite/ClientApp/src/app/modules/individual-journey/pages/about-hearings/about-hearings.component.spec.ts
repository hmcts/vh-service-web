import { IndividualJourneyComponentTestBed } from './../individual-base-component/individual-component-test-bed.spec';
import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { AboutHearingsComponent } from './about-hearings.component';
import { IndividualJourney } from '../../individual-journey';
import { ContinuableComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { IndividualJourneySteps } from '../../individual-journey-steps';

describe('AboutHearingsComponent', () => {
  it(`should continue to ${IndividualJourneySteps.DifferentHearingTypes}`, () => {
    const journey = jasmine.createSpyObj<IndividualJourney>(['goto']);
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: AboutHearingsComponent,
      declarations: [ CrestBluePanelComponent ],
      providers: [ { provide: IndividualJourney, useValue: journey } ]
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.DifferentHearingTypes);
  });
});
