import {IndividualJourneyComponentTestBed}
from '../../../individual-journey/pages/individual-base-component/individual-component-test-bed.spec';
import {CrestBluePanelComponent} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {SelfTestJourney} from '../../self-test-journey';
import {SelfTestComponent} from './self-test.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';

describe('SelfTestComponent', () => {
  it('can continue', () => {
    const journey = jasmine.createSpyObj<SelfTestJourney>(['next']);
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: SelfTestComponent,
      declarations: [ CrestBluePanelComponent ],
      providers: [ { provide: SelfTestJourney, useValue: journey } ]
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
  });
});
