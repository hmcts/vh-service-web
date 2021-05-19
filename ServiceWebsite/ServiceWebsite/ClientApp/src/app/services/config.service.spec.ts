import { HttpBackend, HttpResponse } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Config } from '../modules/shared/models/config';
import { SessionStorage } from '../modules/shared/services/session-storage';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
    let httpBackendSpy: jasmine.SpyObj<HttpBackend>;
    let clientSettings: Config;
    let configService: ConfigService;
    let clientSettingCache: SessionStorage<Config>;

    beforeEach(() => {
        httpBackendSpy = jasmine.createSpyObj<HttpBackend>('HttpBackend', ['handle']);
        clientSettingCache = new SessionStorage<Config>('vh.client.settings');

        clientSettings = new Config();
        clientSettings.tenant_id = 'tenantId';
        clientSettings.client_id = 'clientId';
        clientSettings.post_logout_redirect_uri = '/dashboard';
        clientSettings.redirect_uri = '/dashboard';
        httpBackendSpy.handle.and.returnValue(of(new HttpResponse({ body: clientSettings })));
        configService = new ConfigService(httpBackendSpy);
    });

    afterEach(() => {
        clientSettingCache.clear();
    });

    it('should have called method on httpClient', fakeAsync(() => {
        configService.loadConfig();
        tick();
        configService.getClientSettings().toPromise();
        tick();
        expect(httpBackendSpy.handle).toHaveBeenCalled();
    }));

    it('should not have called method on httpClient', fakeAsync(() => {
        clientSettingCache.set(clientSettings);
        configService.loadConfig();
        tick();
        configService.getClientSettings().toPromise();
        tick();
        expect(httpBackendSpy.handle).not.toHaveBeenCalled();
    }));
});
