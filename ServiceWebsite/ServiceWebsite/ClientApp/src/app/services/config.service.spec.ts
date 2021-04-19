import { TestBed, inject } from '@angular/core/testing';
import { Config } from '../modules/shared/models/config';
import { ConfigService, ENVIRONMENT_CONFIG } from './config.service';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { of } from 'rxjs';

describe('ConfigService', () => {

  const httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
  const errorService: jasmine.SpyObj<ErrorService> = jasmine.createSpyObj('ErrorService', ['handleError']);
  const serviceResponse = {
    videoAppUrl: '',
    rappInsightsInstrumentationKey: '',
    tenantId: '',
    clientId: '',
    postLogoutRedirectUri: '',
    redirectUri: '',
    baseVideoUrl: '',
    pexip_self_test_node_uri: 'uri'
  };
  httpClient.get.and.returnValue(of(serviceResponse));

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
  it('should read configuration', inject([ConfigService], async (service: ConfigService) => {
    const conf = await service.loadConfig();

    expect(conf).toBeTruthy();
    // expect(conf.pexipSelfTestNodeUri).toBe('uri'); TODO - Fix
  }));
});
