import { AppInsights } from 'applicationinsights-js';
import { LogAdapter } from './log-adapter';
import { Config } from '../modules/shared/models/config';
import { Injectable } from '@angular/core';

enum SeverityLevel {
    Verbose = 0,
    Information = 1,
    Warning = 2,
    Error = 3,
    Critical = 4
}

@Injectable()
export class AppInsightsLogger implements LogAdapter {
    errorInfo: any;

    constructor(config: Config) {
        const appInsightsConfig: Microsoft.ApplicationInsights.IConfig = {
            instrumentationKey: config.app_insights_instrumentation_key
        };

        // Unfortunately, there is no way to know if the setup is successful or not
        AppInsights.downloadAndSetup(appInsightsConfig);

        // When it's been initialised, set the role so we know which application is logging
        AppInsights.queue.push(() => {
            AppInsights.context.addTelemetryInitializer(envelope => {
                envelope.tags['ai.cloud.role'] = 'vh-service-web';
            });
        });
    }

    debug(message: string, properties: any = null): void {
        AppInsights.trackTrace(message, properties, SeverityLevel.Verbose);
    }

    info(message: string, properties: any = null): void {
        AppInsights.trackTrace(message, properties, SeverityLevel.Information);
    }

    warn(message: string, properties: any = null): void {
        AppInsights.trackTrace(message, properties, SeverityLevel.Warning);
    }

    trackPage(pageName: string, url: string) {
        AppInsights.trackPageView(pageName, url);
    }

    trackEvent(eventName: string, properties: any) {
        AppInsights.trackEvent(eventName, properties);
    }

    trackException(message: string, err: Error, properties: any) {
        properties = properties || {};
        properties.message = message;

        this.errorInfo = err;
        properties.errorInformation = this.errorInfo
            ? `${this.errorInfo.error} : ${this.errorInfo.status}
       : ${this.errorInfo.statusText} : ${this.errorInfo.url} : ${this.errorInfo.message}`
            : ``;

        AppInsights.trackException(err, null, properties);
        AppInsights.trackTrace(message, properties, SeverityLevel.Error);
    }

    flushBuffer() {
        AppInsights.flush();
    }
}
