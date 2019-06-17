import { QuestionnaireCompletedComponent } from './questionnaire-completed.component';
import { AppYesNoPipe } from '../../../shared/boolean.pipe';
import { HasAccessToCamera } from '../../../base-journey/participant-suitability.model';
import { RepresentativeJourneyComponentTestBed } from '../representative-base-component/representative-journey-component-test-bed.spec';
import { PrintService } from '../../../../services/print.service';

describe('QuestionnaireCompletedComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe],
      providers: [PrintService]
    });
    expect(fixture).toBeTruthy();
  });

  it('gets the camera answer values which are mapped', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe],
      providers: [PrintService]
    });

    fixture.componentInstance.model.camera = HasAccessToCamera.Yes;
    expect(fixture.componentInstance.getCameraAnswer()).toBe('Yes');

    fixture.componentInstance.model.camera = HasAccessToCamera.No;
    expect(fixture.componentInstance.getCameraAnswer()).toBe('No');

    fixture.componentInstance.model.camera = HasAccessToCamera.NotSure;
    expect(fixture.componentInstance.getCameraAnswer()).toBe('I\'m not sure');
  });

  it('gets the camera answer values which are not mapped', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe],
      providers: [PrintService]
    });

    fixture.componentInstance.model.camera = 999;
    expect(fixture.componentInstance.getCameraAnswer()).toBeUndefined();
  });
});
