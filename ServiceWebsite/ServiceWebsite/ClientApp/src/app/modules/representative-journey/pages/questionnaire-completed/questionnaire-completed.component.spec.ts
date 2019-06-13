import { QuestionnaireCompletedComponent } from './questionnaire-completed.component';
import { AppYesNoPipe } from '../../../shared/boolean.pipe';
import { HasAccessToCamera } from '../../../base-journey/participant-suitability.model';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';

describe('QuestionnaireCompletedComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe]
    });
    expect(fixture).toBeTruthy();
  });

  it('gets the camera answer values which are mapped', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe]
    });

    fixture.componentInstance.model.camera = HasAccessToCamera.Yes;
    expect(fixture.componentInstance.GetCameraAnswer()).toBe('Yes');

    fixture.componentInstance.model.camera = HasAccessToCamera.No;
    expect(fixture.componentInstance.GetCameraAnswer()).toBe('No');

    fixture.componentInstance.model.camera = HasAccessToCamera.NotSure;
    expect(fixture.componentInstance.GetCameraAnswer()).toBe('I\'m not sure');
  });

  it('gets the camera answer values which are not mapped', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe]
    });

    fixture.componentInstance.model.camera = 999;
    expect(fixture.componentInstance.GetCameraAnswer()).toBeUndefined();
  });
});
