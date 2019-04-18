import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdalService, AdalGuard, AdalInterceptor } from 'adal-angular4';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './services/error.service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LoggerService } from './services/logger.service';
import { ConfigService, ENVIRONMENT_CONFIG } from './services/config.service';
import { Config } from './models/config';
import { CustomAdalInterceptor } from './custom-adal-interceptor';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error/page-not-found.component';
import { GuidanceComponent } from './guidance/guidance.component';

import { GuidanceService } from './guidance/guidance.service';
import { PrintService } from './services/print.service';
import { DocumentRedirectService } from './services/document-redirect.service';
import { WindowRef } from './shared/window-ref';
import { AppInsightsLogger } from './services/app-insights-logger.service';

import { CitizenModule } from './citizen/citizen.module';
import { ProfessionalModule } from './professional.module';
import { ProfessionalCitizenModule } from './professional-citizen.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';

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
    BrowserModule,
    CitizenModule,
    ProfessionalModule,
    ProfessionalCitizenModule,
    SecurityModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initConfiguration, deps: [ConfigService], multi: true },
    { provide: Config, useFactory: () => ENVIRONMENT_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: CustomAdalInterceptor, multi: true },
    AppRoutingModule,
    ConfigService,
    ConfigService,
    LoggerService,
    AppInsightsLogger,
    AdalService,
    AdalGuard,
    AdalInterceptor,
    WindowRef,
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
