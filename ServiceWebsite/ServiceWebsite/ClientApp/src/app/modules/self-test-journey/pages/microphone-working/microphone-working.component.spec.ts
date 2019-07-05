import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {
  CrestBluePanelComponent
} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {MicrophoneWorkingComponent} from './microphone-working.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';

describe('MicrophoneWorkingComponent', () => {
  it('can continue', () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: MicrophoneWorkingComponent,
      declarations: [CrestBluePanelComponent],
      journey: journey
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SeeAndHearVideo);
  });
});
