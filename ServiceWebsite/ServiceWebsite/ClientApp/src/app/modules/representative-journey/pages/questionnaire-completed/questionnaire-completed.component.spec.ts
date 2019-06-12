import { RepresentativeJourneyComponentTestBed } from './../representative-base-component/component-test-bed.spec';
import { QuestionnaireCompletedComponent } from './questionnaire-completed.component';

describe('QuestionnaireCompletedComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent
    });
    expect(fixture).toBeTruthy();
  });
});
