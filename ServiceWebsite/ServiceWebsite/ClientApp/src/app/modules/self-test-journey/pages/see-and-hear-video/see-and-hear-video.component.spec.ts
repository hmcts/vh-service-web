import { fakeAsync } from '@angular/core/testing';
import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {
  CrestBluePanelComponent
} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {SeeAndHearVideoComponent} from './see-and-hear-video.component';
import { ParticipantJourneySteps } from 'src/app/modules/base-journey/participant-journey-steps';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { By } from '@angular/platform-browser';

describe('SeeAndHearVideoComponent', () => {
  let fixture;
  let journey;
  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto', 'submitQuestionnaire']);
    fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: SeeAndHearVideoComponent,
      declarations: [CrestBluePanelComponent],
      journey: journey
    });
  });


  it(`submits and goes to ${ParticipantJourneySteps.ThankYou} on continuing`, async () => {

    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();

    // wait for the changes since the submit is async
    await fixture.whenStable();

    expect(journey.goto).toHaveBeenCalledWith(ParticipantJourneySteps.ThankYou);
    expect(journey.submitQuestionnaire).toHaveBeenCalled();
  });

  it(`redirects to ${SelfTestJourneySteps.SelfTest} on clicking on check your equipment again`,  () => {
    fixture.detectChanges();
    const checkYourEquipmentButton = fixture.debugElement.query(By.css('#checkYourEquipment'));
    checkYourEquipmentButton.nativeElement.click();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SelfTest);

  });
});
