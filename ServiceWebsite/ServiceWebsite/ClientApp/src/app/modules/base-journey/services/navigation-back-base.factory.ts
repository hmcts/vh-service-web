import { NavigationBackFactory } from './navigation-back.factory';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SessionStorage } from '../../shared/services/session-storage';
import { NavigateBackUrlModel } from './navigate-back-url.model';

const QuestionnaireAlreadyCompletedUrl = '/questionnaire-already-completed';

export class NavigationBackBaseFactory implements NavigationBackFactory {

  eventsStore: NavigationStart[] = [];
  continueUrl: string;
  dropPointUrls: string[] = [];
  private readonly cache = new SessionStorage<NavigateBackUrlModel>('NAVIGATEBACKURL_MODEL');

  constructor(protected router: Router,
    protected userType: string,
    protected dropPoints: string[]) {
    this.dropPointUrls = dropPoints;
  }

  handles(userType: string): boolean {
    return userType === this.userType;
  }

  subscribeToEvent() {
    this.router.events.pipe(
      filter((event) => {
        return (event instanceof NavigationStart);
      })
    ).subscribe((event: NavigationStart) => {
      this.subscribeToNavigationStart(event);
    });
  }

  subscribeToNavigationStart(event: NavigationStart) {
    this.eventsStore.push(event);

    if (event.navigationTrigger === 'popstate') {
      const countEvents = this.eventsStore.length;
      if (countEvents > 1 && this.dropPointUrls.length > 0) {
        const previousEvent = this.eventsStore[countEvents - 2];

        this.completedPoint(previousEvent.url);

        if (previousEvent.url === QuestionnaireAlreadyCompletedUrl) {
          this.navigateBackToDropPoint();
        }
      }
    }
  }

  private completedPoint(previousEventUrl: string) {
    this.dropPointUrls.forEach(p => {
      if (previousEventUrl === p) {
        this.cache.set(new NavigateBackUrlModel(previousEventUrl));
        this.router.navigate([QuestionnaireAlreadyCompletedUrl]);
      }
    });
  }

  private navigateBackToDropPoint() {
    const model = this.cache.get();
    const url = model ? model.url : '';
    this.router.navigate([url]);
  }

}
