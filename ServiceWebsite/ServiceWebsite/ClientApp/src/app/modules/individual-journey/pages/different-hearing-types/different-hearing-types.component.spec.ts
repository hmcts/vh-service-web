import { CrestBluePanelComponent } from 'src/app/modules/shared/crest-blue-panel/crest-blue-panel.component';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { DifferentHearingTypesComponent } from './different-hearing-types.component';
import { IndividualJourney } from '../../individual-journey';
import { ContinuableComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('DifferentHearingTypesComponent', () => {
  it('can proceed', () => {
    const journey = jasmine.createSpyObj<IndividualJourney>(['next']);
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: DifferentHearingTypesComponent,
      declarations: [ CrestBluePanelComponent ],
      providers: [ { provide: IndividualJourney, useValue: journey } ]
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
  });
});
