import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthInterceptor, AuthModule, LogLevel, OidcConfigService, OidcSecurityService } from 'angular-auth-oidc-client';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';
import { RefreshTokenParameterInterceptor } from './refresh-token-parameter.interceptor';

export function loadConfig(configService: ConfigService, oidcConfigService: OidcConfigService): Function {
    return () => {
        configService.getClientSettings().subscribe(clientSettings => {
            oidcConfigService.withConfig({
                stsServer: `https://login.microsoftonline.com/${clientSettings.tenant_id}/v2.0`,
                redirectUrl: clientSettings.redirect_uri,
                postLogoutRedirectUri: clientSettings.post_logout_redirect_uri,
                clientId: clientSettings.client_id,
                scope: `openid profile offline_access api://${clientSettings.client_id}/feapi`,
                responseType: 'code',
                maxIdTokenIatOffsetAllowedInSeconds: 600,
                autoUserinfo: false,
                logLevel: environment.production ? LogLevel.Warn : LogLevel.Debug,
                secureRoutes: ['.'],
                ignoreNonceAfterRefresh: true,
                tokenRefreshInSeconds: 5,
                silentRenew: true,
                useRefreshToken: true
            });
        });
    };
}
@NgModule({
    imports: [AuthModule.forRoot(), HttpClientModule],
    providers: [
        OidcSecurityService,
        OidcConfigService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [ConfigService, OidcConfigService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenParameterInterceptor, multi: true }
    ],
    exports: [AuthModule]
})
export class AuthConfigModule {}
