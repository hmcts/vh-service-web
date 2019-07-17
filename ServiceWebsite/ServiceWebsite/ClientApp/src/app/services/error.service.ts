import { Injectable, ErrorHandler, Injector, NgZone, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../paths';
import { Logger } from './logger';

@Injectable()
export class ErrorService extends ErrorHandler {
  // unfortunately, being an implementation of the ErrorHandler, if we try to
  // inject the dependencies in the constructor we get a cyclic resolution error
  // instead we have to get the injector and resolve the classes when using tem
  constructor(private injector: Injector, private zone: NgZone) {
    super();
  }

  handleError(err: any) {
    const router: Router = this.injector.get(Router);
    const logger: Logger = this.injector.get(Logger as Type<Logger>);

    err = this.unboxRejection(err);

    logger.error('Unhandled error occured', err, { url: router.url });
      this.redirectTo(router, Paths.Error);
  }

  private redirectTo(router: Router, page: string): any {
    // handle error executes outside of the angular zone so we need to force it back in to do the redirection correctly
    this.zone.run(() => router.navigate([page]));
  }

  private unboxRejection(err: any): any {
    // if the error is thrown through a promise, we can unbox the actual error this way
    return err.rejection || err;
  }
}
