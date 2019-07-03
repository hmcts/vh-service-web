import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {
  CrestBluePanelComponent
} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {SignInOtherComputerComponent} from './sign-in-other-computer.component';

describe('SignInOtherComputerComponent', () => {
  it('can continue', () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['next']);
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: SignInOtherComputerComponent,
      declarations: [CrestBluePanelComponent],
      journey: journey
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
  });
});
