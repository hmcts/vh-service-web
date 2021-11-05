// angular
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AppRoutingModule } from './app-routing.module';
// core
import { AppComponent } from './app.component';
import { ScrollTriggerDirective } from './directives/scroll-trigger.directive';
import { WindowScrolling } from './directives/window-scrolling';
import { JourneySelectorComponent } from './journey-selector/journey-selector.component';
import { BaseJourneyModule } from './modules/base-journey/base-journey.module';
import { IndividualJourneyModule } from './modules/individual-journey/individual-journey.module';
// modules
import { RepresentativeJourneyModule } from './modules/representative-journey/representative-journey.module';
import { AuthConfigModule } from './modules/security/auth-config.module';
import { SecurityModule } from './modules/security/security.module';
import { SelfTestJourneyModule } from './modules/self-test-journey/self-test-journey.module';
import { Config } from './modules/shared/models/config';
import { SharedModule } from './modules/shared/shared.module';
import { AccessibilityComponent } from './pages/accessibility/accessibility.component';
import { ErrorComponent } from './pages/error/error.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';
import { HomeComponent } from './pages/home/home.component';
import { MediaErrorComponent } from './pages/media-error/media-error.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// components and pages
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { QuestionnaireAlreadyCompletedComponent } from './pages/questionnaire-already-completed/questionnaire-already-completed.component';
import { SignInOnComputerComponent } from './pages/sign-in-on-computer/sign-in-on-computer.component';
import { UnsupportedBrowserComponent } from './pages/unsupported-browser/unsupported-browser.component';
import { AppInsightsLogger } from './services/app-insights-logger.service';
import { SERVICE_WEB_API_BASE_URL } from './services/clients/api-client';
import { ConfigService, ENVIRONMENT_CONFIG } from './services/config.service';
import { ConsoleLogger } from './services/console-logger';
import { DocumentRedirectService } from './services/document-redirect.service';
// services
import { ErrorService } from './services/error.service';
import { GuidanceService } from './services/guidance.service';
import { Logger } from './services/logger';
import { LoggerService, LOG_ADAPTER } from './services/logger.service';
import { PrintService } from './services/print.service';

export function loadConfig(configService: ConfigService) {
    return () => configService.loadConfig();
}

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        PrivacyPolicyComponent,
        HomeComponent,
        PageNotFoundComponent,
        GuidanceComponent,
        MediaErrorComponent,
        UnsupportedBrowserComponent,
        QuestionnaireAlreadyCompletedComponent,
        AccessibilityComponent,
        ScrollTriggerDirective,
        SignInOnComputerComponent,
        JourneySelectorComponent
    ],
    imports: [
        BrowserModule,
        SecurityModule,
        BaseJourneyModule,
        IndividualJourneyModule,
        RepresentativeJourneyModule,
        SelfTestJourneyModule,
        AppRoutingModule,
        SharedModule,
        AuthConfigModule
    ],
    providers: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        { provide: APP_INITIALIZER, useFactory: loadConfig, deps: [ConfigService], multi: true },
        { provide: Config, useFactory: () => ENVIRONMENT_CONFIG },
        { provide: LOG_ADAPTER, useClass: ConsoleLogger, multi: true },
        { provide: LOG_ADAPTER, useClass: AppInsightsLogger, multi: true, deps: [ConfigService, OidcSecurityService] },
        { provide: SERVICE_WEB_API_BASE_URL, useFactory: () => '.' },
        { provide: Logger, useClass: LoggerService },
        AppInsightsLogger,
        ConfigService,
        ErrorService,
        GuidanceService,
        PrintService,
        DocumentRedirectService,
        { provide: ErrorHandler, useClass: ErrorService },
        WindowScrolling
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
