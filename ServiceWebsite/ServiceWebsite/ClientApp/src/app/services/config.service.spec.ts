import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

describe('ConfigService', () => {
  
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
  let errorService: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj('ErrorService', ['handleError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: ErrorService, useValue: errorService },
        ConfigService
      ]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));
});
