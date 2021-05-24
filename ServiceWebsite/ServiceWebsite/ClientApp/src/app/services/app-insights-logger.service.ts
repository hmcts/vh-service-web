import { Injectable } from '@angular/core';
import { ApplicationInsights, ITelemetryItem, SeverityLevel } from '@microsoft/applicationinsights-web';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { LogAdapter } from './log-adapter';

@Injectable()
export class AppInsightsLogger implements LogAdapter {
    errorInfo: any;
    appInsights: ApplicationInsights;

    constructor(configService: ConfigService, oidcSecurityService: OidcSecurityService) {
        this.setupAppInsights(configService, oidcSecurityService).subscribe();
    }

    private setupAppInsights(configService: ConfigService, oidcSecurityService: OidcSecurityService): Observable<void> {
        configService.loadConfig();
        return configService.getClientSettings().pipe(
            map(configSettings => {
                this.appInsights = new ApplicationInsights({
                    config: {
                        instrumentationKey: configSettings.app_insights_instrumentation_key,
                        isCookieUseDisabled: true
                    }
                });
                this.appInsights.loadAppInsights();
                oidcSecurityService.userData$.subscribe(ud => {
                    this.appInsights.addTelemetryInitializer((envelope: ITelemetryItem) => {
                        envelope.tags['ai.cloud.role'] = 'vh-video-web';
                        envelope.tags['ai.user.id'] = ud.preferred_username.toLowerCase();
                    });
                });
            })
        );
    }

    debug(message: string, properties: any = null): void {
        if (this.appInsights) {
            this.appInsights.trackTrace({ message, severityLevel: SeverityLevel.Verbose }, properties);
        }
    }

    info(message: string, properties: any = null): void {
        this.appInsights.trackTrace({ message, severityLevel: SeverityLevel.Information }, properties);
    }

    warn(message: string, properties: any = null): void {
        this.appInsights.trackTrace({ message, severityLevel: SeverityLevel.Warning }, properties);
    }

    trackPage(pageName: string, url: string) {
        this.appInsights.trackPageView({ name: pageName, uri: url });
    }

    trackEvent(eventName: string, properties: any) {
        this.appInsights.trackEvent({ name: eventName }, properties);
    }

    trackException(message: string, err: Error, properties: any) {
        properties = properties || {};
        properties.message = message;

        this.errorInfo = err;
        properties.errorInformation = this.errorInfo
            ? `${this.errorInfo.error} : ${this.errorInfo.status}
       : ${this.errorInfo.statusText} : ${this.errorInfo.url} : ${this.errorInfo.message}`
            : ``;

        this.appInsights.trackTrace({ message, severityLevel: SeverityLevel.Error }, properties);
        this.appInsights.trackException({
            error: err,
            properties: properties
        });
    }

    flushBuffer() {
        this.appInsights.flush();
    }
}
