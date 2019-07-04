import { QuestionnaireCompletedComponent } from './questionnaire-completed.component';
import { AppYesNoPipe } from '../../../shared/boolean.pipe';
import { HasAccessToCamera, SelfTestAnswers } from '../../../base-journey/participant-suitability.model';
import {
  RepresentativeJourneyComponentTestBed,
  RepresentativeJourneyStubs
} from '../representative-base-component/representative-journey-component-test-bed.spec';
import { PrintService } from '../../../../services/print.service';
import { RepresentativeJourneySteps } from '../../representative-journey-steps';
import { SuitabilityChoiceComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';

describe('QuestionnaireCompletedComponent', () => {
  it(`goes to ${RepresentativeJourneySteps} when pressing contiinue`, () => {
    const journey = RepresentativeJourneyStubs.journeySpy;

    // because values are being bound they must be set
    journey.model.camera = HasAccessToCamera.Yes;
    journey.model.computer = true;
    journey.model.room = true;
    journey.model.aboutYou.answer = true;
    journey.model.aboutYourClient.answer = true;
    journey.model.clientAttendance = false;
    journey.model.hearingSuitability.answer = false;

    const componentFixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe],
      providers: [PrintService]
    });

    const fixture = new SuitabilityChoiceComponentFixture(componentFixture);
    fixture.submitIsClicked();

    expect(journey.goto).toHaveBeenCalledWith(RepresentativeJourneySteps.ThankYou);
  });

  it('gets the camera answer values which are mapped', () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe],
      providers: [PrintService],
      journey: journey
    });

    journey.model.camera = HasAccessToCamera.Yes;
    expect(fixture.componentInstance.getCameraAnswer()).toBe('Yes');

    journey.model.camera = HasAccessToCamera.No;
    expect(fixture.componentInstance.getCameraAnswer()).toBe('No');

    journey.model.camera = HasAccessToCamera.NotSure;
    expect(fixture.componentInstance.getCameraAnswer()).toBe('I\'m not sure');
  });

  it('gets the camera answer values which are not mapped', () => {
    const journey = RepresentativeJourneyStubs.journeySpy;
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe],
      providers: [PrintService],
      journey: journey
    });

    journey.model.camera = 999;
    expect(fixture.componentInstance.getCameraAnswer()).toBeUndefined();
  });
});
