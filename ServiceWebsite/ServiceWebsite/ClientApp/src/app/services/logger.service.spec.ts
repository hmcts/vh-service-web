import { LogAdapter } from './log-adapter';
import { TestBed, inject } from '@angular/core/testing';

import { LoggerService, LOG_ADAPTER } from './logger.service';

describe('LoggerService', () => {

  let logger: LoggerService;
  let logAdapter: jasmine.SpyObj<LogAdapter>;

  beforeEach(() => {
    logAdapter = jasmine.createSpyObj('AppInsightsLogger', ['trackException', 'trackEvent']);

    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        { provide: LOG_ADAPTER, useValue: logAdapter, multi: true }
      ]
    });

    logger = TestBed.get(LoggerService);
  });

  it('should be created', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));

  it('waits until initialized before logging', () => {
    logger.event('testing');
  });
});
