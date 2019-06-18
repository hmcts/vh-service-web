import { Injectable } from '@angular/core';
import { SessionStorage } from '../../shared/services/session-storage';
import { RepresentativeSuitabilityModel } from '../representative-suitability.model';

@Injectable()
export class RepresentativeJourneyService {
  private readonly cache: SessionStorage<RepresentativeSuitabilityModel>;

  constructor() {
    this.cache = new SessionStorage<RepresentativeSuitabilityModel>('REPRESENTATIVEJOURNEY_MODEL');
  }

  get(): RepresentativeSuitabilityModel {
    const cached = this.cache.get();

    return cached;
  }

  set(model: RepresentativeSuitabilityModel): void {
    this.cache.set(model);
  }
}
