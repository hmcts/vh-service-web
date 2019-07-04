import { fakeAsync } from '@angular/core/testing';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {
  CrestBluePanelComponent
} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {SeeAndHearVideoComponent} from './see-and-hear-video.component';
import { ParticipantJourneySteps } from 'src/app/modules/base-journey/participant-journey-steps';

describe('SeeAndHearVideoComponent', () => {
  it(`submits and goes to ${ParticipantJourneySteps.ThankYou} on continuing`, async () => {
    const journey = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    const fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: SeeAndHearVideoComponent,
      declarations: [CrestBluePanelComponent],
      journey: journey
    });

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();

    // wait for the changes since the submit is async
    await fixture.whenStable();

    expect(journey.goto).toHaveBeenCalledWith(ParticipantJourneySteps.ThankYou);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
  });
});
