import { Injectable } from '@angular/core';
import { SessionStorage } from '../shared/services/session-storage';
import { SelfTestModel } from './self-test.model';

@Injectable()
export class SelfTestJourneyService {
  private readonly cache: SessionStorage<SelfTestModel>;

  constructor() {
    this.cache = new SessionStorage<SelfTestModel>('SELFTESTJOURNEY_MODEL');
  }

  get(): SelfTestModel {
    const response = this.cache.get();

    return response === null ? null : response;

  }

  set(model: SelfTestModel): void {
    this.cache.set(model);
  }
}
