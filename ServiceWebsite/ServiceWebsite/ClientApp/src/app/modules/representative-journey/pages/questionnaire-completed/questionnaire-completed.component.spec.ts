import { RepresentativeJourneyComponentTestBed } from './../representative-base-component/component-test-bed.spec';
import { QuestionnaireCompletedComponent } from './questionnaire-completed.component';
import {AppYesNoPipe} from '../../../shared/boolean.pipe';

describe('QuestionnaireCompletedComponent', () => {
  it('can be created', () => {
    const fixture = RepresentativeJourneyComponentTestBed.createComponent({
      component: QuestionnaireCompletedComponent,
      declarations: [AppYesNoPipe]
    });
    expect(fixture).toBeTruthy();
  });
});
