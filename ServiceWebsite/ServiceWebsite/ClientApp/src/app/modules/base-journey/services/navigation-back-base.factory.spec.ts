import { NavigationBackBaseFactory } from './navigation-back-base.factory';
import { Router, NavigationStart } from '@angular/router';

describe('NavigationBackBaseFactory', () => {
  let factory: NavigationBackBaseFactory;
  const router = jasmine.createSpyObj<Router>(['navigate']);

  beforeEach(() => {
    factory = new NavigationBackBaseFactory(router,
      'Individual',
      ['/thank-you', '/check-your-computer']);
  });

  it('should return true if the user role is individual', () => {
    expect(factory.handles('Individual')).toBeTruthy();
  });
  it('should return false if the user role is not individual', () => {
    expect(factory.handles('any role')).toBeFalsy();
  });
  it('should add router event in the array', () => {
    const event = new NavigationStart(1, '/thank-you', 'popstate');
    factory.subscribeToNavigationStart(event);
    expect(factory.eventsStore.length).toBe(1);
  });
  it('should navigate from drop point on the press back to questionnaire already completed page', () => {
    const event = new NavigationStart(1, '/about-you', 'imperative');
    const event1 = new NavigationStart(2, '/thank-you', 'popstate');
    factory.eventsStore = [event, event1];
    factory.subscribeToNavigationStart(event1);
    expect(factory.eventsStore.length).toBe(3);
    expect(router.navigate).toHaveBeenCalledWith(['/questionnaire-already-completed']);
  });
  it('should navigate to drop point on the press back from questionnaire already completed page', () => {
    const event = new NavigationStart(1, '/questionnaire-already-completed', 'imperative');
    const event1 = new NavigationStart(2, '/thank-you', 'popstate');
    const event2 = new NavigationStart(2, '/questionnaire-already-completed', 'popstate');

    factory.eventsStore = [event, event1];
    factory.subscribeToNavigationStart(event2);
    expect(factory.eventsStore.length).toBe(3);
    expect(router.navigate).toHaveBeenCalledWith(['/questionnaire-already-completed']);
  });
});
