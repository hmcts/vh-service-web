import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {CrestBluePanelComponent} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {SelfTestComponent} from './self-test.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

describe('SelfTestComponent', () => {
  it('can continue', () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: SelfTestComponent,
      journey: journey,
      declarations: [ CrestBluePanelComponent ]
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.CameraWorking);
  });
});
