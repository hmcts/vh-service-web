import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Config } from '../modules/shared/models/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorage } from '../modules/shared/services/session-storage';
import { filter, map } from 'rxjs/operators';

export let ENVIRONMENT_CONFIG: Config = new Config();

@Injectable()
export class ConfigService {

  clientSettingsLoaded$ = new BehaviorSubject(false);
  private SETTINGS_KEY = 'vh.client.settings';
  private readonly clientSettingCache: SessionStorage<Config>;
  private httpClient: HttpClient; 
    
  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
    this.clientSettingCache = new SessionStorage<Config>(this.SETTINGS_KEY);
  }

  loadConfig() {
    if (this.getConfig()) {
        this.clientSettingsLoaded$.next(true);
        return;
    }

    try {
        this.retrieveConfigFromApi().subscribe(result => {
            this.clientSettingCache.set(result);
            this.clientSettingsLoaded$.next(true);
        });
    } catch (err) {
        console.error(`failed to read configuration: ${err}`);
        throw err;
    }
  }

  getClientSettings(): Observable<Config> {
    return this.clientSettingsLoaded$.pipe(
        filter(Boolean),
        map(() => this.getConfig())
    );
  }
  
  getConfig(): Config {
    return this.clientSettingCache.get();
  }

  private retrieveConfigFromApi(): Observable<Config> {
    let url = '/api/config';
    url = url.replace(/[?&]$/, '');
    return this.httpClient.get<Config>(url);
  }
}
