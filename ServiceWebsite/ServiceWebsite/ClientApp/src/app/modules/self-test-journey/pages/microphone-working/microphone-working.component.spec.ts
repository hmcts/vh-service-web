import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import {SelfTestJourneyComponentTestBed} from '../self-test-base-component/self-test-component-test-bed.spec';
import {
  CrestBluePanelComponent
} from '../../../shared/crest-blue-panel/crest-blue-panel.component';
import {ContinuableComponentFixture} from '../../../base-journey/components/suitability-choice-component-fixture.spec';
import {MicrophoneWorkingComponent} from './microphone-working.component';
import { SelfTestJourneySteps } from '../../self-test-journey-steps';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('MicrophoneWorkingComponent', () => {

  let fixture: ComponentFixture<MicrophoneWorkingComponent>;
  let journey: jasmine.SpyObj<JourneyBase>;

  beforeEach(() => {
    journey = jasmine.createSpyObj<JourneyBase>(['goto']);
    fixture = SelfTestJourneyComponentTestBed.createComponent({
      component: MicrophoneWorkingComponent,
      declarations: [CrestBluePanelComponent],
      journey: journey
    });
  });

  it('can continue', () => {
    fixture.detectChanges();
    new ContinuableComponentFixture(fixture).submitIsClicked();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SeeAndHearVideo);
  });

  it(`redirects to ${SelfTestJourneySteps.SelfTest} on clicking on check your equipment again`,  () => {
    fixture.detectChanges();
    const checkYourEquipmentButton = fixture.debugElement.query(By.css('#checkYourEquipment'));
    checkYourEquipmentButton.nativeElement.click();
    expect(journey.goto).toHaveBeenCalledWith(SelfTestJourneySteps.SelfTest);
  });
});
