import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {CrestBluePanelComponent} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {SelfTestJourney} from '../../self-test-journey';
import {SelfTestComponent} from './self-test.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';

describe('SelfTestComponent', () => {
  it('can continue', () => {
    const journey = jasmine.createSpyObj<SelfTestJourney>(['next', 'startAt']);
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: SelfTestComponent,
      journey: journey,
      declarations: [ CrestBluePanelComponent ]
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
  });
});
