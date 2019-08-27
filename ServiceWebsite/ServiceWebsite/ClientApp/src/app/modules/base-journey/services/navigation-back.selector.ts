import { NavigationBackFactory } from './navigation-back.factory';
import { InjectionToken, Injectable, Inject } from '@angular/core';

export const NAVIGATION_BACK_FACTORY = new InjectionToken<NavigationBackFactory>('NavigationBackFactory');


@Injectable()
export class NavigationBackSelector {
  private currentFactory: NavigationBackFactory;

  constructor(@Inject(NAVIGATION_BACK_FACTORY) private factories: NavigationBackFactory[]) { }

  async beginFor(userType: string): Promise<void> {
    const factory = this.factories.filter(j => j.handles(userType));
    if (factory.length === 0) {
      throw new Error(`Found no navigation back matching user type: ${userType}`);
    } else if (factory.length > 1) {
      throw new Error(`Found more than one navigation back matching user type: ${userType}`);
    }

    this.currentFactory = factory[0];
    await this.currentFactory.subscribeToEvent();
  }
}
