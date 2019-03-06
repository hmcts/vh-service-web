import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './../models/config';

export let ENVIRONMENT_CONFIG : Config = new Config();

@Injectable()
export class ConfigService {
  constructor(private httpClient: HttpClient) { 
  }

  load(): Promise<Config> {
    return this.httpClient.get("/api/config")
      .toPromise()
      .then(result => this.parse(result))
      .catch(err => {
        console.log(`failed to read configuration: ${err}`);
        throw err;
      });
  }

  private parse(result: any): Promise<Config> {
    ENVIRONMENT_CONFIG = new Config(result.video_app_url, result.app_insights_instrumentation_key);
    ENVIRONMENT_CONFIG.tenantId = result.tenant_id;
    ENVIRONMENT_CONFIG.clientId = result.client_id;
    ENVIRONMENT_CONFIG.redirectUri = result.redirect_uri;
    ENVIRONMENT_CONFIG.postLogoutRedirectUri = result.post_logout_redirect_uri;
    return Promise.resolve(ENVIRONMENT_CONFIG);
  }
}
