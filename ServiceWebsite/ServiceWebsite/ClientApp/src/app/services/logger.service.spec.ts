import { LogAdapter } from './log-adapter';
import { TestBed, inject } from '@angular/core/testing';

import { LoggerService, LOG_ADAPTER } from './logger.service';

describe('LoggerService', () => {

  let logger: LoggerService;
  let logAdapter: jasmine.SpyObj<LogAdapter>;

  beforeEach(() => {
    logAdapter = jasmine.createSpyObj<LogAdapter>(['trackException', 'trackEvent']);

    // Set up the entire testing module as to test the injection token works properly
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        { provide: LOG_ADAPTER, useValue: logAdapter, multi: true }
      ]
    });

    logger = TestBed.get(LoggerService);
  });

  it('logs events to all adapters', () => {
    const properties = {};
    logger.event('event', properties);

    expect(logAdapter.trackEvent).toHaveBeenCalledWith('event', properties);
  });

  it('logs errors to all adapters', () => {
    const error = new Error();
    const properties = {};
    logger.error('error', error, properties);

    expect(logAdapter.trackException).toHaveBeenCalledWith('error', error, properties);
  });
});
