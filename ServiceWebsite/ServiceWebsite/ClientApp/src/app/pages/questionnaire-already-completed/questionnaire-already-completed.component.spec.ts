import { QuestionnaireAlreadyCompletedComponent } from './questionnaire-already-completed.component';
import { NavigateBackUrlModel } from '../../modules/base-journey/services/navigate-back-url.model';
import { Router } from '@angular/router';

describe('QuestionnaireAlreadyCompletedComponent', () => {
  let component: QuestionnaireAlreadyCompletedComponent;
  const router = jasmine.createSpyObj<Router>(['navigate']);

  beforeEach(() => {
    component = new QuestionnaireAlreadyCompletedComponent(router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set show details to true', () => {
    expect(component.showTextDetails).toBeFalsy();
    component.showDetails();
    expect(component.showTextDetails).toBeTruthy();
  });
  it('should navigate to url that was saved in session', () => {
    component.cache.set(new NavigateBackUrlModel('/url'));
    component.continue();
    expect(router.navigate).toHaveBeenCalled();
  });
});
