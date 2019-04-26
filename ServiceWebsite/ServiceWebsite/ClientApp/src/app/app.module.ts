// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// third party
import { AdalService, AdalGuard, AdalInterceptor } from 'adal-angular4';

// core
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Config } from './modules/shared/models/config';

// components and pages
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';
import { ErrorComponent } from './pages/error/error.component';

// services
import { ErrorService } from './services/error.service';
import { ConfigService, ENVIRONMENT_CONFIG } from './services/config.service';
import { LoggerService, LOG_ADAPTER } from './services/logger.service';
import { CustomAdalInterceptor } from './services/custom-adal-interceptor';
import { GuidanceService } from './services/guidance.service';
import { PrintService } from './services/print.service';
import { DocumentRedirectService } from './services/document-redirect.service';
import { AppInsightsLogger } from './services/app-insights-logger.service';
import { ConsoleLogger } from './services/console-logger';
import { Logger } from './services/logger';

// modules
import { RepresentativeJourneyModule } from './modules/representative-journey/representative-journey.module';
import { IndividualJourneyModule } from './modules/individual-journey/individual-journey.module';
import { BaseJourneyModule } from './modules/base-journey/base-journey.module';
import { SecurityModule } from './modules/security/security.module';
import { SharedModule } from './modules/shared/shared.module';

export function initConfiguration(configService: ConfigService) {
  return () => configService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PrivacyPolicyComponent,
    HomeComponent,
    PageNotFoundComponent,
    GuidanceComponent
  ],
  imports: [
    // angular
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // app
    SecurityModule,
    BaseJourneyModule,
    IndividualJourneyModule,
    RepresentativeJourneyModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initConfiguration, deps: [ConfigService], multi: true },
    { provide: Config, useFactory: () => ENVIRONMENT_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: CustomAdalInterceptor, multi: true },
    { provide: LOG_ADAPTER, useClass: ConsoleLogger, multi: true },
    { provide: LOG_ADAPTER, useClass: AppInsightsLogger, multi: true },
    { provide: Logger, useClass: LoggerService },
    AppInsightsLogger,
    AppRoutingModule,
    ConfigService,
    AdalService,
    AdalGuard,
    AdalInterceptor,
    ErrorService,
    GuidanceService,
    PrintService,
    DocumentRedirectService,
    { provide: ErrorHandler, useClass: ErrorService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
